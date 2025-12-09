'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLegalOverlay } from '@/components/legal/LegalOverlayProvider';
import { aetherLogo, thirdwebLogo } from './constants';

export const MintFooter = () => {
	const { openLegal } = useLegalOverlay();

	return (
		<footer className='relative flex flex-col text-center justify-evenly rows-3 mx-auto shrink w-screen h-auto border-t mint-border my-3 gap-2 pt-3'>
			<div className='relative flex flex-row mx-auto justify-center justify-self-center'>
				<p className=' text-sm relative flex flex-row mx-auto shrink mint-gradient-text font-semibold justify-self-center text-center pt-2 my-3'>
					© {new Date().getFullYear()} BEDLAM520 Development
				</p>
			</div>
			<div className='relative flex flex-row mx-auto justify-self-center order-second'>
				<div className='text-xs relative flex flex-row order-second mx-auto shrink items-center gap-1 mint-gradient-text justify-self-center my-3 bg-transparent'>
					<span className='flex flex-col mx-auto shrink bg-transparent'>
						• Powered by{' '}
					</span>
					<Link
						href='https://thirdweb.com'
						className='relative flex mx-auto shrink mint-gradient-text bg-transparent hover:mint-cyan-strong'
					>
						<div className='z-0 relative flex flex-col justify-self-center justify-items-center align-middle bg-transparent items-center place-items-center'>
							<Image
								src={thirdwebLogo}
								alt='thirdweb'
								width={56}
								height={20}
								className='z-5  relative flex flex-col m-auto justify-self-center align-middle shrink h-auto w-auto bg-transparent'
							/>
							<div className='z-1 relative flex flex-col m-auto justify-self-center align-middle shrink rounded-full max-w-[56px] max-h-[20px] bg-transparent  mint-purple-logo-glow-sm sm:mint-purple-logo-glow md:mint-purple-logo-glow lg:mint-purple-logo-glow xl:mint-purple-logo-glow' />
						</div>
					</Link>
					<span className='flex mx-auto shrink'> ThirdWeb and </span>
					<div className='z-0 relative flex flex-col justify-self-center justify-items-center align-middle bg-transparent items-center place-items-center'>
						<Image
							src={aetherLogo}
							alt='Aether'
							width={35}
							height={35}
							className='z-5 relative flex flex-col m-auto justify-self-center align-middle shrink h-auto w-auto bg-transparent'
						/>
						<div className='z-1 relative flex flex-col justify-self-center align-middle shrink rounded-full max-w-[35px] max-h-[35px] bg-transparent mint-purple-logo-glow-sm sm:mint-purple-logo-glow md:mint-purple-logo-glow lg:mint-purple-logo-glow xl:mint-purple-logo-glow' />
					</div>
					<span className='flex mx-auto shrink'> Æther •</span>
				</div>
			</div>
			<div className='mb-1'>
				<div className='text-xs tight relative flex flex-row order-last mx-auto shrink items-center justify-self-center my-2'>
					<Link
						href='/terms'
						className='relative flex flex-col mx-auto shrink mint-gradient-text hover:mint-cyan-strong'
						onClick={(e) => {
							e.preventDefault();
							openLegal('terms');
						}}
					>
						Terms of Service
					</Link>
					<span className='relative flex flex-col mx-auto shrink mint-gradient-text'>
						|
					</span>
					<Link
						href='/privacy'
						className='relative flex flex-col mx-auto shrink mint-gradient-text hover:mint-cyan-strong'
						onClick={(e) => {
							e.preventDefault();
							openLegal('privacy');
						}}
					>
						Privacy Policy
					</Link>
					<span className='relative flex flex-col mx-auto shrink mint-gradient-text'>
						|
					</span>
					<Link
						href='/data-handling'
						className='relative flex flex-col mx-auto shrink mint-gradient-text hover:mint-cyan-strong'
						onClick={(e) => {
							e.preventDefault();
							openLegal('data');
						}}
					>
						Data Handling
					</Link>
				</div>
			</div>
		</footer>
	);
};
