import type { Metadata } from 'next';

import MintsExperience from '@/components/mints/MintsExperience';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';

export const generateMetadata = (): Metadata => ({
	title: 'BEDLAM520nft Mints Portal',
	description: siteConfig.description,
	openGraph: {
		title: 'BEDLAM520nft · Mints Portal',
		description: siteConfig.description,
		url: siteConfig.routes.home,
		images: [siteConfig.assets.ogImage],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'BEDLAM520nft · Mints Portal',
		images: [siteConfig.assets.ogImage],
	},
});

export default function Home() {
	return <MintsExperience />;
}
