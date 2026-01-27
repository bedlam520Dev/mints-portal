import { siteConfig } from '@/config/site';

// Structured Data Types (Schema.org)
type WebSiteStructuredData = {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	name: string;
	url: string;
	description: string;
	inLanguage: string;
	potentialAction: {
		'@type': 'SearchAction';
		target: {
			'@type': 'EntryPoint';
			urlTemplate: string;
		};
		'query-input': string;
	};
};

type OrganizationStructuredData = {
	'@context': 'https://schema.org';
	'@type': 'Organization';
	name: string;
	url: string;
	logo: string;
	description: string;
	sameAs: string[];
	contactPoint: {
		'@type': 'ContactPoint';
		contactType: string;
		url: string;
	};
};

type WebPageStructuredData = {
	'@context': 'https://schema.org';
	'@type': 'WebPage';
	name: string;
	description: string;
	url: string;
	inLanguage: string;
	isPartOf: {
		'@type': 'WebSite';
		url: string;
	};
};

export function getWebsiteStructuredData(): WebSiteStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		inLanguage: 'en-US',
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.url}/?search={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};
}

export function getOrganizationStructuredData(): OrganizationStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'BEDLAM520 Development',
		url: siteConfig.url,
		logo: `${siteConfig.url}${siteConfig.assets.logo}`,
		description: siteConfig.description,
		sameAs: [
			siteConfig.social.twitterSite,
			'https://opensea.io/collection/bedlam520nft-editions',
			'https://farcaster.xyz/bedlam520.eth',
			'https://base.app/profile/bedlam520.eth',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Support',
			url: siteConfig.url,
		},
	};
}

export function getWebPageStructuredData(
	title: string,
	description: string,
	url: string
): WebPageStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: title,
		description: description,
		url: url,
		inLanguage: 'en-US',
		isPartOf: {
			'@type': 'WebSite',
			url: siteConfig.url,
		},
	};
}
