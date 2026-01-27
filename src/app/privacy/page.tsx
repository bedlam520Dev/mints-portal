import { PrivacyContent } from '@/components/legal/LegalContent';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'How BEDLAM520nft handles wallet data, technical logs, and third-party processors.',
	openGraph: {
		title: 'Privacy Policy | BEDLAM520nft',
		description:
			'How BEDLAM520nft handles wallet data, technical logs, and third-party processors.',
		url: `${siteConfig.url}${siteConfig.routes.privacy}`,
	},
	twitter: {
		title: 'Privacy Policy | BEDLAM520nft',
		description:
			'How BEDLAM520nft handles wallet data, technical logs, and third-party processors.',
	},
};

export default function PrivacyPage() {
	return (
		<main className='mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed'>
			<PrivacyContent mode='page' />
		</main>
	);
}
