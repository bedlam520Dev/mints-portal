import Image from 'next/image';

import { ActionLinkButton } from '@/components/mints/ActionLinkButton';

import { ACTION_LINKS, heroBanner } from './constants';

export const HeroSection = () => (
	<section className='relative flex mx-auto mb-10 mint-hero max-w-[95vw] h-auto mint-cyan-glow-sm-panel md:mint-cyan-glow-panel lg:mint-cyan-glow-panel xl:mint-cyan-glow-panel'>
		<div className='relative flex flex-row w-full h-auto m-auto mint-hero-content'>
			<div className='relative flex flex-col w-full h-auto m-auto justify-center align-middle'>
				<div className='relative flex flex-col mx-auto justify-self-center justify-center align-top mint-hero-banner mint-cyan-glow-sm-img md:mint-cyan-glow-img lg:mint-cyan-glow-img xl:mint-cyan-glow-img'>
					<Image
						src={heroBanner}
						alt='BEDLAM520nft Banner'
						width={1200}
						height={800}
						priority
						className='object-contain'
					/>
				</div>
				{/* <p className='text-sm uppercase tracking-[0.4em] mint-muted-text'>
					Base Drop
				</p>
				<h2 className='text-4xl font-semibold leading-tight'>
					Futurist æther mints
				</h2>
				<p className='mint-muted-text'>
					Live metadata from every BEDLAM520 contract—claim windows,
					allowlists, and pricing rendered straight from the chain.
					Choose a portal, connect, and mint.
				</p> */}
				<div className='relative grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7 mx-auto align-bottom justify-items-center justify-evenly mint-action-bar'>
					{ACTION_LINKS.map((action) => (
						<ActionLinkButton
							key={action.id}
							label={action.label}
							href={action.href}
							icon={action.icon}
						/>
					))}
				</div>
			</div>
		</div>
	</section>
);
