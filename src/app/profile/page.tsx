import type { Metadata } from 'next';

import { ProfileContent } from '@/components/profile/ProfileContent';

export const metadata: Metadata = {
    title: 'User Profile | BEDLAM520nft Mints',
    description:
        'Your user profile for BEDLAM520nft Mints.',
};

export default function ProfilePage() {
    return (
        <main className='relative flex flex-col mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed'>
            <ProfileContent mode='page' />
        </main>
    );
}
