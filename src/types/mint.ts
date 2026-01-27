export type MintAttribute = {
	label: string;
	value: string;
};

export type ContractStandard = 'erc1155' | 'erc721' | 'erc20';

export type ContractRef = {
	slug: string;
	address: `0x${string}`;
	label: string;
	chainId: number;
	chainName: string;
	nativeSymbol: string;
	standard: ContractStandard;
};

export type ClaimSummary = {
	price: string;
	rawPrice: string;
	currencySymbol: string;
	currencyAddress: `0x${string}`;
	currencyDecimals: number;
	maxClaimableSupply: string | null;
	supplyClaimed: string | null;
	quantityLimitPerWallet: string | null;
	startTimestamp: number | null;
	endTimestamp: number | null;
	allowlistRequired: boolean;
};

export type MintSummary = {
	id: string;
	tokenId: string;
	title: string;
	description: string;
	image: string | null;
	mintedLabel: string;
	supply: string | null;
	maxSupply: string | null;
	attributes: MintAttribute[];
	isLive: boolean;
	contract: ContractRef;
	claim: ClaimSummary | null;
	standard: ContractStandard;
};
