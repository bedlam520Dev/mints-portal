export const siteConfig = {
	name: 'BEDLAM520nft Minting Portal',
	description: 'The Official Minting Portal for BEDLAM520nft.',
	url: 'https://bedlam520nft.vercel.app',
	routes: {
		home: '/',
		privacy: '/privacy',
		terms: '/terms',
		dataHandling: '/data-handling',
	},
	social: {
		twitterHandle: '@bedlam520',
		twitterSite: 'https://x.com/bedlam520',
	},
	assets: {
		ogImage: '/1200x630.png',
		logo: '/1024x1024.png',
	},
};

export type SiteConfig = typeof siteConfig;
