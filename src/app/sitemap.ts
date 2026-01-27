import { siteConfig } from '@/config/site';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const base = siteConfig.url;
	return [
		{
			url: `${base}${siteConfig.routes.home}`,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${base}${siteConfig.routes.profile}`,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${base}${siteConfig.routes.contact}`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${base}${siteConfig.routes.terms}`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${base}${siteConfig.routes.privacy}`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${base}${siteConfig.routes.dataHandling}`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	];
}
