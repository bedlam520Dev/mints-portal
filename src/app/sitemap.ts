import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = siteConfig.url;
	return [
		{
			url: `${base}${siteConfig.routes.home}`,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${base}${siteConfig.routes.privacy}`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${base}${siteConfig.routes.terms}`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	];
}
