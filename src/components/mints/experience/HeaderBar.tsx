import Image from 'next/image';

import { BedlamConnectButton } from '@/components/wallet/BedlamConnectButton';

import { logoImage } from './constants';

export const HeaderBar = () => (
	<header className='position-fixed mint-header pl-6 pt-4 pr-6'>
		<div className='relative flex flex-row w-screen h-auto mx-auto mb-3 justify-items-space-between'>
			<div className='relative flex overflow-hidden rounded-xl border justify-self-start align-top w-[40px] h-[40px] sm:w-[40px] sm:h-[40px] lg:w-16 lg:h-16 xl:w-[56px] xl:h-[56px] mint-purple-glow-sm md:mint-purple-glow lg:mint-purple-glow xl:mint-purple-glow'>
				<Image
					src={logoImage}
					alt='BEDLAM520nft'
					fill
					sizes='56px'
					className='relative flex flex-col object-contain'
					loading='lazy'
				/>
			</div>
			{/* <div>
				<h1 className='text-2xl font-semibold leading-tight align-bottom m-auto'>
					BEDLAM520nft
				</h1>
			</div> */}
			<div className='relative flex flex-col w-auto h-auto m-auto justify-self-between align-top'></div>
			<div className='relative flex flex-col justify-self-end align-top'>
				<div className='mint-connect-wrapper mint-purple-glow-sm md:mint-purple-glow lg:mint-purple-glow xl:mint-purple-glow'>
					<BedlamConnectButton />
				</div>
			</div>
		</div>
	</header>
);
