import { dropContracts } from '@/config/contracts';
import type { ContractRef, MintSummary } from '@/types/mint';

import { fallbackNftImage } from './constants';

const buildFallbackContract = (): ContractRef => {
	if (dropContracts[0]) {
		const config = dropContracts[0];
		return {
			slug: config.slug,
			address: config.address,
			label: config.label,
			chainId: config.chainId,
			chainName: config.chain?.name ?? 'Base',
			nativeSymbol: config.nativeCurrency.symbol ?? 'ETH',
			standard: config.standard,
		};
	}

	return {
		slug: 'placeholder',
		address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
		label: 'Placeholder Drop',
		chainId: 8453,
		chainName: 'Base',
		nativeSymbol: 'ETH',
		standard: 'erc1155',
	};
};

export const getFallbackContract = (): ContractRef => buildFallbackContract();

export const getFallbackMints = (): MintSummary[] => {
	const contract = buildFallbackContract();
	return [
		{
			id: 'placeholder-1',
			tokenId: '1',
			title: 'Placeholder Mint',
			description:
				'Dynamic mint data failed to load. This placeholder keeps the layout intact.',
			image: fallbackNftImage,
			mintedLabel: '0 minted',
			supply: '0',
			maxSupply: null,
			attributes: [],
			isLive: false,
			contract,
			claim: null,
			standard: contract.standard,
		},
	];
};
