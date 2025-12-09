import type { Metadata } from 'next';

import { PrivacyContent } from '@/components/legal/LegalContent';

export const metadata: Metadata = {
	title: 'Privacy Policy | BEDLAM520nft',
	description:
		'How BEDLAM520nft handles wallet data, technical logs, and third-party processors.',
};

export default function PrivacyPage() {
	return (
		<main className='mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed'>
			<PrivacyContent mode='page' />
		</main>
	);
}
