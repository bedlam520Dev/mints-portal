import { getServerThirdwebClient } from '@/app/client';
import { dropContracts, getContractConfig } from '@/config/contracts';
import { loadMintsForContract } from '@/lib/mints/loaders';
import type { MintSummary } from '@/types/mint';
import { NextRequest, NextResponse } from 'next/server';
import { getContract, prepareContractCall, sendTransaction } from 'thirdweb';
import { getActiveClaimCondition as getErc721ActiveClaimCondition } from 'thirdweb/extensions/erc721';
import { getActiveClaimCondition as getErc1155ActiveClaimCondition } from 'thirdweb/extensions/erc1155';
import { privateKeyToAccount } from 'thirdweb/wallets';

type MintRequestBody = {
	contractSlug: string;
	tokenId: string;
	quantity: number;
	toAddress: string;
};

type RateKey = string;

type RateEntry = {
	count: number;
	resetAt: number;
};

type ClaimCondition = {
	pricePerToken: bigint;
	merkleRoot?: string;
	currency?: string;
	currencyAddress?: string;
};

/**
 * In-memory rate limiter store.
 * This persists for the lifetime of the serverless/edge runtime instance.
 */
const rateStore = new Map<RateKey, RateEntry>();

const ONE_MINUTE_MS = 60_000;

/**
 * Maximum number of mint API calls allowed per (address, IP) per window.
 * Override via MINT_API_MAX_REQUESTS_PER_MINUTE.
 */
const MAX_REQUESTS_PER_WINDOW =
	Number.parseInt(process.env.MINT_API_MAX_REQUESTS_PER_MINUTE || '', 10) || 5;

/**
 * Maximum quantity per transaction. Override via MINT_API_MAX_QUANTITY_PER_TX.
 */
const MAX_QUANTITY_PER_TX =
	Number.parseInt(process.env.MINT_API_MAX_QUANTITY_PER_TX || '', 10) || 3;

/**
 * Optional origin enforcement. When MINT_API_ENFORCE_ORIGIN=1 and
 * MINT_API_ALLOWED_ORIGIN is set, only that origin may call this endpoint.
 */
const ENFORCE_ORIGIN = (() => {
	const raw = process.env.MINT_API_ENFORCE_ORIGIN;
	if (!raw) return false;
	return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
})();

const ALLOWED_ORIGIN = process.env.MINT_API_ALLOWED_ORIGIN || '';

const parseJsonBody = async (req: NextRequest): Promise<MintRequestBody | null> => {
	try {
		const json = (await req.json()) as Partial<MintRequestBody>;

		if (
			!json.contractSlug ||
			typeof json.contractSlug !== 'string' ||
			!json.tokenId ||
			typeof json.tokenId !== 'string' ||
			!json.toAddress ||
			typeof json.toAddress !== 'string' ||
			typeof json.quantity !== 'number'
		) {
			return null;
		}

		return {
			contractSlug: json.contractSlug,
			tokenId: json.tokenId,
			quantity: json.quantity,
			toAddress: json.toAddress,
		};
	} catch {
		return null;
	}
};

const findDropContract = (slug: string) => {
	return dropContracts.find((c) => c.slug === slug);
};

const getProjectWalletAccount = () => {
	const client = getServerThirdwebClient();
	const pk = process.env.NEXT_THIRDWEB_PROJECT_WALLET_PRIVATE_KEY;

	if (!pk) {
		throw new Error(
			'Missing NEXT_THIRDWEB_PROJECT_WALLET_PRIVATE_KEY for mint signer.'
		);
	}

	return privateKeyToAccount({
		client,
		privateKey: pk,
	});
};

const getClientIp = (req: NextRequest): string => {
	const xff = req.headers.get('x-forwarded-for');
	if (xff) {
		const [first] = xff.split(',');
		if (first) {
			return first.trim();
		}
	}
	const realIp = req.headers.get('x-real-ip');
	if (realIp) return realIp;
	return 'unknown';
};

const makeRateKey = (ip: string, address: string): RateKey =>
	`${ip}::${address.toLowerCase()}`;

const checkRateLimit = (key: RateKey): { allowed: boolean; remaining: number } => {
	const now = Date.now();
	const existing = rateStore.get(key);

	if (!existing || existing.resetAt <= now) {
		rateStore.set(key, {
			count: 1,
			resetAt: now + ONE_MINUTE_MS,
		});
		return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
	}

	if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
		return { allowed: false, remaining: 0 };
	}

	existing.count += 1;
	rateStore.set(key, existing);

	return {
		allowed: true,
		remaining: MAX_REQUESTS_PER_WINDOW - existing.count,
	};
};

const enforceOriginIfConfigured = (req: NextRequest): string | null => {
	if (!ENFORCE_ORIGIN || !ALLOWED_ORIGIN) return null;
	const origin = req.headers.get('origin');
	if (!origin || origin !== ALLOWED_ORIGIN) {
		return 'Unauthorized origin.';
	}
	return null;
};

/**
 * GET /api/mints
 * Fetches all mints across all contracts or filtered by contract slug.
 * Query params: ?contract=<slug>
 */
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const contractSlug = searchParams.get('contract');

		let allMints: MintSummary[] = [];

		if (contractSlug) {
			// Fetch mints for specific contract
			const config = getContractConfig(contractSlug);
			if (!config) {
				return NextResponse.json(
					{ error: `Contract '${contractSlug}' not found` },
					{ status: 404 }
				);
			}
			allMints = await loadMintsForContract(config);
		} else {
			// Fetch mints for all contracts
			const promises = dropContracts.map((config) => loadMintsForContract(config));
			const results = await Promise.all(promises);
			allMints = results.flat();
		}

		return NextResponse.json({ mints: allMints }, { status: 200 });
	} catch (error) {
		console.error('GET /api/mints error:', error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : 'Failed to load mints',
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	if (req.method !== 'POST') {
		return new NextResponse('Method Not Allowed', { status: 405 });
	}

	const originError = enforceOriginIfConfigured(req);
	if (originError) {
		return NextResponse.json({ ok: false, error: originError }, { status: 403 });
	}

	const body = await parseJsonBody(req);

	if (!body) {
		return NextResponse.json(
			{ ok: false, error: 'Invalid request body.' },
			{ status: 400 }
		);
	}

	const { contractSlug, tokenId, quantity, toAddress } = body;

	if (!toAddress.startsWith('0x') || toAddress.length < 42) {
		return NextResponse.json(
			{ ok: false, error: 'Invalid destination address.' },
			{ status: 400 }
		);
	}

	if (!Number.isFinite(quantity) || quantity <= 0) {
		return NextResponse.json(
			{ ok: false, error: 'Quantity must be a positive number.' },
			{ status: 400 }
		);
	}

	if (quantity > MAX_QUANTITY_PER_TX) {
		return NextResponse.json(
			{
				ok: false,
				error: `Quantity exceeds per-transaction limit of ${MAX_QUANTITY_PER_TX}.`,
			},
			{ status: 400 }
		);
	}

	const contractRef = findDropContract(contractSlug);

	if (!contractRef) {
		return NextResponse.json(
			{ ok: false, error: 'Unknown contract slug.' },
			{ status: 400 }
		);
	}

	const ip = getClientIp(req);
	const rateKey = makeRateKey(ip, toAddress);
	const { allowed, remaining } = checkRateLimit(rateKey);

	if (!allowed) {
		return NextResponse.json(
			{
				ok: false,
				error: 'Rate limit exceeded for this wallet and IP. Please try again later.',
			},
			{ status: 429 }
		);
	}

	try {
		const client = getServerThirdwebClient();
		const account = getProjectWalletAccount();

		const contract = getContract({
			client,
			address: contractRef.address,
			chain: contractRef.chain,
		});

		const tokenIdBigInt = BigInt(tokenId);
		const quantityBigInt = BigInt(quantity);

		// Fetch active claim condition to get the correct price and currency
		const claimCondition =
			contractRef.standard === 'erc721'
				? await getErc721ActiveClaimCondition({
						contract,
					})
				: await getErc1155ActiveClaimCondition({
						contract,
						tokenId: tokenIdBigInt,
					});

		// Check if this token requires an allowlist
		const condition = claimCondition as unknown as ClaimCondition;
		const merkleRoot = condition.merkleRoot;
		const ZERO_BYTES32 =
			'0x0000000000000000000000000000000000000000000000000000000000000000';
		const hasAllowlist =
			merkleRoot && merkleRoot !== ZERO_BYTES32 && merkleRoot !== '0x';

		if (hasAllowlist) {
			return NextResponse.json(
				{
					ok: false,
					error:
						'This token has an allowlist requirement. Gasless minting is not available. Please use the "Mint" button to mint with your wallet.',
				},
				{ status: 400 }
			);
		}

		// Extract price and currency from claim condition
		const pricePerToken = condition.pricePerToken || 0n;
		const currency =
			condition.currency ||
			condition.currencyAddress ||
			'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

		// Calculate total value to send (price * quantity)
		const totalValue = pricePerToken * quantityBigInt;

		const transaction = prepareContractCall({
			contract,
			method:
				'function claim(address _receiver, uint256 _tokenId, uint256 _quantity, address _currency, uint256 _pricePerToken, (bytes32[],uint256,uint256,address) _allowlistProof, bytes _data)',
			params: [
				toAddress, // _receiver
				tokenIdBigInt, // _tokenId
				quantityBigInt, // _quantity
				currency, // _currency (from claim condition)
				pricePerToken, // _pricePerToken (from claim condition)
				[[], 0n, 0n, '0x0000000000000000000000000000000000000000'], // _allowlistProof (empty)
				'0x', // _data (empty)
			],
			value: totalValue, // Send the payment value
		});

		const tx = await sendTransaction({
			account,
			transaction,
		});

		return NextResponse.json(
			{
				ok: true,
				transactionHash: tx.transactionHash,
				remainingRequests: remaining,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Mint API error:', error, {
			contractAddress: contractRef.address,
			chainId: contractRef.chainId,
		});

		const message =
			error instanceof Error
				? error.message
				: 'Unexpected error while processing mint.';

		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
