import { TermsContent } from '@/components/legal/LegalContent';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description:
		'Terms governing use of the BEDLAM520nft website, smart contracts, and mints.',
	openGraph: {
		title: 'Terms of Service | BEDLAM520nft',
		description:
			'Terms governing use of the BEDLAM520nft website, smart contracts, and mints.',
		url: `${siteConfig.url}${siteConfig.routes.terms}`,
	},
	twitter: {
		title: 'Terms of Service | BEDLAM520nft',
		description:
			'Terms governing use of the BEDLAM520nft website, smart contracts, and mints.',
	},
};

export default function TermsPage() {
	return (
		<main className='mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed'>
			<TermsContent mode='page' />
		</main>
	);
}
