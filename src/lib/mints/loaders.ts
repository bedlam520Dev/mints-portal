import { client } from '@/app/client';
import type { DropContractConfig } from '@/config/contracts';
import { ZERO_ADDRESS_STRING } from '@/config/contracts';
import { env } from '@/config/env';
import { buildServerContractInstance } from '@/lib/contracts';
import { getMockMints } from '@/lib/mints/mockData';
import { serializeMint } from '@/lib/mints/serializer';
import type { ClaimSummary, ContractRef, MintSummary } from '@/types/mint';
import { getContract } from 'thirdweb';
import { getCurrencyMetadata } from 'thirdweb/extensions/erc20';
import {
	getActiveClaimCondition as getErc721ActiveClaimCondition,
	getNFT as getErc721NFT,
	getNFTs as getErc721NFTs,
} from 'thirdweb/extensions/erc721';
import {
	getActiveClaimCondition as getErc1155ActiveClaimCondition,
	getNFT as getErc1155NFT,
	getNFTs as getErc1155NFTs,
} from 'thirdweb/extensions/erc1155';
import { formatUnits } from 'viem';

const ZERO_BYTES32 =
	'0x0000000000000000000000000000000000000000000000000000000000000000';

const toContractRef = (config: DropContractConfig): ContractRef => ({
	slug: config.slug,
	address: config.address,
	label: config.label,
	chainId: config.chainId,
	chainName: config.chain?.name ?? `Chain ${config.chainId}`,
	nativeSymbol: config.nativeCurrency.symbol ?? 'ETH',
	standard: config.standard,
});

type ClaimCondition1155 = Awaited<ReturnType<typeof getErc1155ActiveClaimCondition>>;
type _ClaimCondition721 = Awaited<ReturnType<typeof getErc721ActiveClaimCondition>>;

type AnyClaimCondition = ClaimCondition1155;
type DropNFT = Awaited<ReturnType<typeof getErc1155NFT>>;

const getConditionCurrency = (condition: AnyClaimCondition): string => {
	const typed = condition as { currency?: string; currencyAddress?: string };
	return typed.currency ?? typed.currencyAddress ?? ZERO_ADDRESS_STRING;
};

const summarizeClaimCondition = async (
	config: DropContractConfig,
	condition: AnyClaimCondition
): Promise<ClaimSummary> => {
	const currencyAddress = getConditionCurrency(
		condition
	).toLowerCase() as `0x${string}`;
	let currencySymbol =
		config.nativeCurrency.symbol ?? config.nativeCurrency.name ?? 'ETH';
	let decimals = config.nativeCurrency.decimals ?? 18;

	if (currencyAddress !== ZERO_ADDRESS_STRING) {
		const currencyContract = getContract({
			client,
			address: currencyAddress,
			chain: config.chain,
		});
		const metadata = await getCurrencyMetadata({
			contract: currencyContract,
		});
		currencySymbol = metadata.symbol;
		decimals = metadata.decimals ?? decimals;
	}

	const formattedPrice = formatUnits(condition.pricePerToken, decimals);

	const merkleRoot = (condition as { merkleRoot?: string }).merkleRoot;

	return {
		price: `${formattedPrice} ${currencySymbol}`,
		rawPrice: condition.pricePerToken.toString(),
		currencySymbol,
		currencyAddress,
		currencyDecimals: decimals,
		maxClaimableSupply: condition.maxClaimableSupply?.toString() ?? null,
		supplyClaimed: condition.supplyClaimed?.toString() ?? null,
		quantityLimitPerWallet: condition.quantityLimitPerWallet?.toString() ?? null,
		startTimestamp:
			'startTimestamp' in condition && condition.startTimestamp
				? Number(condition.startTimestamp)
				: null,
		endTimestamp:
			'endTimestamp' in condition && condition.endTimestamp
				? Number(condition.endTimestamp)
				: null,
		allowlistRequired: Boolean(merkleRoot) && merkleRoot !== ZERO_BYTES32,
	} satisfies ClaimSummary;
};

const buildMintFromNft = async (
	config: DropContractConfig,
	nft: DropNFT
): Promise<MintSummary> => {
	const contractInstance = buildServerContractInstance(config);
	let claim: ClaimSummary | null = null;
	try {
		const condition =
			config.standard === 'erc721'
				? await getErc721ActiveClaimCondition({
						contract: contractInstance,
					})
				: await getErc1155ActiveClaimCondition({
						contract: contractInstance,
						tokenId: nft.id,
					});
		claim = await summarizeClaimCondition(config, condition);
	} catch {
		claim = null;
	}

	const contractRef = toContractRef(config);
	return serializeMint({
		nft,
		contract: contractRef,
		claim,
		isLive: Boolean(claim),
	});
};

export const loadMintsForContract = async (
	config: DropContractConfig,
	tokenId?: bigint
): Promise<MintSummary[]> => {
	if (env.useMockData) {
		return getMockMints(config, tokenId);
	}
	const contractInstance = buildServerContractInstance(config);
	try {
		if (typeof tokenId === 'bigint') {
			const nft =
				config.standard === 'erc721'
					? await getErc721NFT({
							contract: contractInstance,
							tokenId,
						})
					: await getErc1155NFT({
							contract: contractInstance,
							tokenId,
						});
			return [await buildMintFromNft(config, nft)];
		}

		const nfts =
			config.standard === 'erc721'
				? await getErc721NFTs({ contract: contractInstance })
				: await getErc1155NFTs({ contract: contractInstance });
		const summaries: MintSummary[] = [];
		for (const nft of nfts) {
			summaries.push(await buildMintFromNft(config, nft));
		}
		return summaries;
	} catch (error) {
		console.error(`Unable to load mints for ${config.slug}`, error);
		return [];
	}
};
