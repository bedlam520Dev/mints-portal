import type { Metadata } from 'next';

import { DataPolicyContent } from '@/components/legal/LegalContent';

export const metadata: Metadata = {
	title: 'Data Handling Policy | BEDLAM520nft',
	description:
		'Detailed explanation of how BEDLAM520nft collects, stores, and manages operational data.',
};

export default function DataHandlingPage() {
	return (
		<main className='mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed'>
			<DataPolicyContent mode='page' />
		</main>
	);
      }
