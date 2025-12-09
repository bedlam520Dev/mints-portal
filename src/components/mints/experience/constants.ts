export const heroBanner = '/825x330.png';
export const logoImage = '/1024x1024.png';
export const fallbackNftImage = '/1024x1024.png';
export const thirdwebLogo = '/thirdweb.svg';
export const aetherLogo = '/aether.svg';

export type ActionLink = {
	id: string;
	label: string;
	href: string;
	icon: string;
};

export const ACTION_LINKS: ActionLink[] = [
	{ id: 'base', label: 'Base', href: 'https://base.org', icon: '🟦' },
	{
		id: 'contract',
		label: '0x767f...af44',
		href: 'https://thirdweb.com/base/0x767fFc681173fCa3D8532a2F2690a672A2C6af44',
		icon: '⚙️',
	},
	{
		id: 'basescan',
		label: 'Basescan',
		href: 'https://basescan.org/address/0x767fFc681173fCa3D8532a2F2690a672A2C6af44',
		icon: '🔗',
	},
	{
		id: 'opensea',
		label: 'OpenSea',
		href: 'https://opensea.io/bedlam520',
		icon: '🌊',
	},
	{
		id: 'visions',
		label: 'Fractal Visions',
		href: 'https://fractalvisions.io',
		icon: '🌀',
	},
	{
		id: 'farcaster',
		label: 'Farcaster',
		href: 'https://farcaster.xyz/bedlam520.eth',
		icon: '🛰️',
	},
	{
		id: 'twitter',
		label: 'X (Twitter)',
		href: 'https://x.com/bedlam520',
		icon: '✖️',
	},
];
    
