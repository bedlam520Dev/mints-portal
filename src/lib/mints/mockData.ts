import {
	fallbackNftImage,
	orbitChoirMockImage,
	signalBirthMockImage,
} from '@/components/mints/experience/constants';
import type { DropContractConfig } from '@/config/contracts';
import { ZERO_ADDRESS_STRING } from '@/config/contracts';
import type { MintAttribute, MintSummary } from '@/types/mint';
import { parseUnits } from 'viem';

const fallbackImage = fallbackNftImage;

type Blueprint = {
	tokenId: string;
	title: string;
	description: string;
	image?: string;
	supply?: string;
	maxSupply?: string;
	attributes?: MintAttribute[];
	isLive?: boolean;
	price?: string;
	mintedLabel?: string;
	quantityLimit?: string | null;
	allowlistRequired?: boolean;
};

const BLUEPRINTS: Blueprint[] = [
	{
		tokenId: '0',
		title: 'Signal Birth',
		description:
			'Genesis transmissions that set the tone for every Bedlam signal that follows.',
		image: signalBirthMockImage,
		supply: '128',
		maxSupply: '520',
		attributes: [
			{ label: 'Realm', value: 'Genesis' },
			{ label: 'Frequency', value: 'Ultra' },
		],
		isLive: true,
		price: '0.0003',
		mintedLabel: '128 / 520 minted',
	},
	{
		tokenId: '1',
		title: 'Orbit Choir',
		description: 'A chorus of guardians keeping cadence across Orbit Station 520.',
		image: orbitChoirMockImage,
		supply: '342',
		maxSupply: '1000',
		attributes: [
			{ label: 'Role', value: 'Chronicler' },
			{ label: 'Mood', value: 'Vast' },
		],
		isLive: true,
		price: '0.0005',
		quantityLimit: '3',
	},
	{
		tokenId: '2',
		title: 'Holo Envoys',
		description:
			'Diplomatic envoys projected from the Bedlam aether. They speak in color gradients.',
		supply: '64',
		maxSupply: '256',
		attributes: [
			{ label: 'Trait', value: 'Prismatic' },
			{ label: 'Alignment', value: 'Neutral' },
		],
		isLive: false,
		price: '0.001',
		allowlistRequired: true,
		mintedLabel: 'Preview — Gates opening soon',
	},
	{
		tokenId: '3',
		title: 'Archive Sparks',
		description:
			'Utility sparks that unlock lore bytes and mock transactions in dev mode.',
		supply: '5',
		maxSupply: '50',
		attributes: [{ label: 'Utility', value: 'Lore Byte' }],
		isLive: true,
		price: '0',
		quantityLimit: '1',
	},
];

const cache = new Map<string, MintSummary[]>();

const formatPriceLabel = (price: string | undefined, symbol: string) => {
	if (!price || Number(price) === 0) {
		return `FREE ${symbol}`;
	}
	return `${price} ${symbol}`;
};

const buildMint = (config: DropContractConfig, blueprint: Blueprint): MintSummary => {
	const symbol = config.nativeCurrency.symbol ?? 'ETH';
	const decimals = config.nativeCurrency.decimals ?? 18;
	const rawPrice = blueprint.price
		? parseUnits(blueprint.price, decimals).toString()
		: '0';

	const claim = {
		price: formatPriceLabel(blueprint.price, symbol),
		rawPrice,
		currencySymbol: symbol,
		currencyAddress: ZERO_ADDRESS_STRING,
		currencyDecimals: decimals,
		maxClaimableSupply: blueprint.maxSupply ?? '0',
		supplyClaimed: blueprint.supply ?? '0',
		quantityLimitPerWallet: blueprint.quantityLimit ?? null,
		startTimestamp: Math.floor(Date.now() / 1000) - 3600,
		endTimestamp: null,
		allowlistRequired: Boolean(blueprint.allowlistRequired),
	};

	return {
		id: `${config.slug}-${blueprint.tokenId}`,
		tokenId: blueprint.tokenId,
		title: blueprint.title,
		description: blueprint.description,
		image: blueprint.image ?? fallbackImage,
		mintedLabel:
			blueprint.mintedLabel ??
			`${blueprint.supply ?? '0'} / ${blueprint.maxSupply ?? '∞'} minted`,
		supply: blueprint.supply ?? null,
		maxSupply: blueprint.maxSupply ?? null,
		attributes: blueprint.attributes ?? [],
		isLive: blueprint.isLive ?? true,
		contract: {
			slug: config.slug,
			address: config.address,
			label: config.label,
			chainId: config.chainId,
			chainName: config.chain?.name ?? `Chain ${config.chainId}`,
			nativeSymbol: symbol,
			standard: config.standard,
		},
		claim,
		standard: config.standard,
	};
};

const buildCollection = (config: DropContractConfig) =>
	BLUEPRINTS.map((blueprint) => buildMint(config, blueprint));

export const getMockMints = (
	config: DropContractConfig,
	tokenId?: bigint
): MintSummary[] => {
	const cached = cache.get(config.slug);
	const collection = cached ?? buildCollection(config);
	if (!cached) {
		cache.set(config.slug, collection);
	}
	if (typeof tokenId === 'bigint') {
		return collection.filter((mint) => mint.tokenId === tokenId.toString());
	}
	return collection;
};
