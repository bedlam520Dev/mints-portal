import { ProfileContent } from '@/components/profile/ProfileContent';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
	description: 'View your BEDLAM520nft collection and minting activity.',
	openGraph: {
		title: 'Profile | BEDLAM520nft',
		description: 'View your BEDLAM520nft collection and minting activity.',
		url: `${siteConfig.url}${siteConfig.routes.profile}`,
	},
	twitter: {
		title: 'Profile | BEDLAM520nft',
		description: 'View your BEDLAM520nft collection and minting activity.',
	},
};

export default function ProfilePage() {
	return (
		<main className='relative mx-auto flex max-w-4xl flex-col text-sm leading-relaxed'>
			<ProfileContent mode='page' />
		</main>
	);
}
