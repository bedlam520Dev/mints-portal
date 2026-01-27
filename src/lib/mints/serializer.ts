import type {
	ClaimSummary,
	ContractRef,
	MintAttribute,
	MintSummary,
} from '@/types/mint';
import type { NFT } from 'thirdweb';

const DEFAULT_IPFS_GATEWAY =
	process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? 'https://ipfs.thirdwebcdn.com/ipfs/';

const normalizeValue = (value: unknown): string => {
	if (value === undefined || value === null) return '';
	if (typeof value === 'string') return value;
	if (typeof value === 'number' || typeof value === 'bigint') {
		return value.toString();
	}
	if (Array.isArray(value)) {
		return value.join(', ');
	}
	if (typeof value === 'object') {
		return JSON.stringify(value);
	}
	// All other types (symbol, function, etc.) - safe to stringify
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	return String(value);
};

const resolveIpfsUri = (uri: string | null | undefined): string | null => {
	if (!uri) return null;
	if (uri.startsWith('ipfs://')) {
		const cleanBase = DEFAULT_IPFS_GATEWAY.replace(/\/$/, '');
		const path = uri.replace('ipfs://', '');
		return `${cleanBase}/${path}`;
	}
	return uri;
};

const extractAttributes = (metadata: NFT['metadata']): MintAttribute[] => {
	if (!metadata) return [];
	const attrs = metadata.attributes;
	if (!Array.isArray(attrs)) return [];
	return attrs
		.map((attr) => {
			if (!attr) return null;
			const label =
				'trait_type' in attr &&
				attr.trait_type &&
				(typeof attr.trait_type === 'string' || typeof attr.trait_type === 'number')
					? String(attr.trait_type)
					: 'name' in attr &&
						  attr.name &&
						  (typeof attr.name === 'string' || typeof attr.name === 'number')
						? String(attr.name)
						: null;
			if (!label) return null;
			return {
				label,
				value: normalizeValue((attr as { value?: unknown }).value),
			} satisfies MintAttribute;
		})
		.filter((attr): attr is MintAttribute => Boolean(attr));
};

type SerializeArgs = {
	nft: NFT;
	contract: ContractRef;
	claim: ClaimSummary | null;
	isLive: boolean;
};

export const serializeMint = ({
	nft,
	contract,
	claim,
	isLive,
}: SerializeArgs): MintSummary => {
	const attributes = extractAttributes(nft.metadata);
	const supply =
		'supply' in nft && nft.supply !== undefined
			? nft.supply.toString()
			: (claim?.supplyClaimed ?? null);
	const maxSupply = claim?.maxClaimableSupply ?? null;
	const mintedLabel = maxSupply
		? `${supply ?? '0'} / ${maxSupply} minted`
		: `${supply ?? '0'} minted`;

	return {
		id: `${contract.slug}-${nft.id.toString()}`,
		tokenId: nft.id.toString(),
		title: nft.metadata?.name ?? `Token #${nft.id.toString()}`,
		description: nft.metadata?.description ?? '',
		image: resolveIpfsUri(nft.metadata?.image) ?? null,
		mintedLabel,
		supply,
		maxSupply,
		attributes,
		isLive,
		contract,
		claim,
		standard: contract.standard,
	} satisfies MintSummary;
};
