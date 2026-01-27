import {
	logoImage,
	ogImage,
	vercelLink,
	xProfileLink,
} from '@/components/mints/experience/constants';

export const siteConfig = {
	name: 'BEDLAM520nft Minting Portal',
	description: 'The Official Minting Portal for BEDLAM520nft.',
	url: vercelLink,
	routes: {
		home: '/',
		privacy: '/privacy',
		terms: '/terms',
		dataHandling: '/data-policy',
		contact: '/contact',
		profile: '/profile',
	},
	social: {
		twitterHandle: '@bedlam520',
		twitterSite: xProfileLink,
	},
	assets: {
		ogImage: ogImage,
		logo: logoImage,
	},
};

export type SiteConfig = typeof siteConfig;
