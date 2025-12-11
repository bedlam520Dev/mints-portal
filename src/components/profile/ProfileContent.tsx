'use client';

import MintActivityPanel from '@/components/mints/experience/MintActivityPanel';
import type { ReactNode } from 'react';

type Mode = 'page' | 'overlay';

type SectionProps = {
	children: ReactNode;
};

const Section = ({ children }: SectionProps) => (
	<section className='space-y-3 text-left'>{children}</section>
);

type ProfileContentProps = {
	mode?: Mode;
};

export const ProfileContent = ({ mode = 'page' }: ProfileContentProps) => (
	<article className='space-y-6 text-md mx-auto text-center justify-center leading-relaxed mint-muted-text'>
		<header
			className={`text-center ${
				mode === 'page' ? 'mb-8' : 'mb-4'
			} mint-gradient-text`}
		>
			<h1 className='text-2xl font-semibold'>• User Profile •</h1>
		</header>
		<Section>
			<h2 className='text-base font-semibold mint-gradient-text'>
				• Your Minting Activity •
			</h2>
			<div className='relative flex flex-row shrink mx-auto justify-center justify-items-center align-middle mint-panel mint-c-glow mint-gradient-text mint-modal-gradient'>
				<MintActivityPanel />
			</div>
		</Section>
	</article>
);
