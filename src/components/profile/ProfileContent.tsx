'use client';

import MintActivityPanel from '@/components/mints/experience/MintActivityPanel';
import type { ReactNode } from 'react';

type Mode = 'page' | 'overlay';

type SectionProps = {
	children: ReactNode;
};

const Section = ({ children }: SectionProps) => (
	<section className='text-left'>{children}</section>
);

type ProfileContentProps = {
	mode?: Mode;
};

export const ProfileContent = ({ mode = 'page' }: ProfileContentProps) => {
	const wrapperClasses = mode === 'page' ? 'w-full max-w-4xl mx-auto' : 'w-full';

	return (
		<article className={wrapperClasses}>
			<header
				className={`flex items-baseline justify-between ${
					mode === 'page' ? 'mb-2' : 'mb-1'
				} mint-gradient-text`}
			>
				<h1 className='mint-activity-h1'>User Profile</h1>
			</header>
			<section className='profile-separator mint-border border'></section>
			<Section>
				<h2 className='mint-activity-h2'>Your Minting Activity</h2>
				<div className='mint-activity-panel-wrapper'>
					<MintActivityPanel />
				</div>
			</Section>
		</article>
	);
};
