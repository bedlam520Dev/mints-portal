export const heroBanner = '/img/825x330.png';
export const logoImage = '/img/1024x1024.png';
export const ogImage = '/img/1200x630.png';
export const fallbackNftImage = '/img/1024x1024.png';
export const signalBirthMockImage = '/mock/signal-birth.png';
export const orbitChoirMockImage = '/mock/orbit-choir.png';
export const thirdwebLogo = '/icons/thirdweb.png';
export const fractalVisionsLogo = '/icons/fractalv.png';
export const openseaLogo = '/icons/opensea.png';
export const farcasterLogo = '/icons/far.png';
export const baseAppLogo = '/icons/base.png';
export const xLogo = '/icons/x.png';
export const thirdwebContractLink =
	'https://thirdweb.com/base/0x767fFc681173fCa3D8532a2F2690a672A2C6af44';
export const fractalVisionsLink = 'https://fractalvisions.io';
export const openseaCollectionLink =
	'https://opensea.io/collection/bedlam520nft-editions';
export const farcasterProfileLink = 'https://farcaster.xyz/bedlam520.eth';
export const baseAppProfileLink = 'https://base.app/profile/bedlam520.eth';
export const xProfileLink = 'https://x.com/bedlam520';
export const vercelLink = 'https://bedlam520nft.vercel.app';
export type LogoLink = {
	id: string;
	href: string;
	iconSrc: string;
	iconAlt: string;
};

export const LOGO_LINKS: LogoLink[] = [
	{
		id: 'contract',
		href: thirdwebContractLink,
		iconSrc: thirdwebLogo,
		iconAlt: 'ThirdWeb Logo',
	},
	{
		id: 'visions',
		href: fractalVisionsLink,
		iconSrc: fractalVisionsLogo,
		iconAlt: 'Fractal Visions Logo',
	},
	{
		id: 'opensea',
		href: openseaCollectionLink,
		iconSrc: openseaLogo,
		iconAlt: 'Opensea Logo',
	},
	{
		id: 'farcaster',
		href: farcasterProfileLink,
		iconSrc: farcasterLogo,
		iconAlt: 'Farcaster Logo',
	},
	{
		id: 'baseapp',
		href: baseAppProfileLink,
		iconSrc: baseAppLogo,
		iconAlt: 'BaseApp Logo',
	},
	{
		id: 'twitter',
		href: xProfileLink,
		iconSrc: xLogo,
		iconAlt: 'X (formerly Twitter) Logo',
	},
];

export type ProfileLink = {
	id: string;
	label: string;
	href: string;
};

export const PROFILE_LINKS: ProfileLink[] = [
	{
		id: 'profile',
		label: 'Profile',
		href: './profile',
	},
];
