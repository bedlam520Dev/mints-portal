import { ContactContent } from '@/components/legal/ContactContent';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact',
	description:
		'Get in touch with BEDLAM520nft. Connect with us on social media or reach out for support.',
	openGraph: {
		title: 'Contact | BEDLAM520nft',
		description:
			'Get in touch with BEDLAM520nft. Connect with us on social media or reach out for support.',
		url: `${siteConfig.url}${siteConfig.routes.contact}`,
	},
	twitter: {
		title: 'Contact | BEDLAM520nft',
		description:
			'Get in touch with BEDLAM520nft. Connect with us on social media or reach out for support.',
	},
};

export default function ContactPage() {
	return (
		<main className='mx-auto max-w-4xl px-6 py-16'>
			<ContactContent />
		</main>
	);
}
