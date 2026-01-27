import type { ContractStandard } from '@/types/mint';
import { defineChain } from 'thirdweb/chains';

type NftContractStandard = Extract<ContractStandard, 'erc721' | 'erc1155'>;

type RawContract = {
	slug: string;
	address: `0x${string}`;
	chainId: number;
	label: string;
	standard: NftContractStandard;
};

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

const sanitizeSlug = (value: string | undefined, fallback: string) =>
	(value?.trim().toLowerCase() || fallback).replace(/[^a-z0-9-]/g, '-');

const parseEnvContracts = () => {
	const raw = process.env.NEXT_PUBLIC_DROP_CONTRACTS;
	if (!raw) return [] as RawContract[];

	return raw
		.split(',')
		.map((entry, index) => {
			const [slug, address, chain, label, standardEntry] = entry.split(':');
			if (!address?.startsWith('0x')) return null;
			const chainId = Number(chain) || 84532;
			const normalizedStandard =
				standardEntry?.toLowerCase() === 'erc721' ? 'erc721' : 'erc1155';
			return {
				slug: sanitizeSlug(slug, `drop-${index + 1}`),
				address: address as `0x${string}`,
				chainId,
				label: label?.trim() || `Drop ${index + 1}`,
				standard: normalizedStandard,
			} satisfies RawContract;
		})
		.filter((value): value is RawContract => Boolean(value));
};

const baseContractAddress = process.env.NEXT_PUBLIC_BEDLAM_CONTRACT_ADDRESS;

const defaultContracts: RawContract[] = baseContractAddress
	? [
			{
				slug: 'bedlam520',
				address: baseContractAddress as `0x${string}`,
				chainId: Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) || 8453,
				label: 'BEDLAM520 Drop',
				standard: 'erc1155',
			},
		]
	: [];

const rawContracts = [...defaultContracts, ...parseEnvContracts()];

const deduped = rawContracts.filter(
	(contract, index, self) =>
		index ===
		self.findIndex(
			(candidate) =>
				candidate.address.toLowerCase() === contract.address.toLowerCase() &&
				candidate.chainId === contract.chainId
		)
);

export const dropContracts = deduped.map((config) => {
	const chain = defineChain(config.chainId);
	return {
		...config,
		chain,
		nativeCurrency: chain?.nativeCurrency ?? {
			symbol: 'ETH',
			decimals: 18,
			name: 'Ether',
		},
	};
});

export type DropContractConfig = (typeof dropContracts)[number];

export const getContractConfig = (slug?: string) => {
	if (!slug) return dropContracts[0];
	return dropContracts.find((contract) => contract.slug === slug) || dropContracts[0];
};

export const getContractConfigByAddress = (address: string) =>
	dropContracts.find(
		(contract) => contract.address.toLowerCase() === address.toLowerCase()
	);

export const ZERO_ADDRESS_STRING = ZERO_ADDRESS;
