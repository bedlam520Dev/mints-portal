import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import type { MintSummary } from '@/types/mint';
import Image from 'next/image';

import { fallbackNftImage } from './constants';

export type MintCardProps = {
	piece: MintSummary;
	isSelected: boolean;
	onSelect: () => void;
};

export const MintCard = ({ piece, isSelected, onSelect }: MintCardProps) => (
	<Button
		type='button'
		variant='ghost'
		onClick={onSelect}
		className={`mint-card shadow-aegean-500/60 ${
			isSelected
				? 'ring-amaranthine-400/60 outline-amaranthine-300/60 ring-offset-2 outline'
				: ''
		}`}
		aria-pressed={isSelected}
	>
		<div className='mint-card__media'>
			<AspectRatio ratio={1}>
				<Image
					src={piece.image ?? fallbackNftImage}
					alt={piece.title}
					width={360}
					height={360}
					className={`mint-card__media-img ${piece.isLive ? '' : 'opacity-80'}`}
				/>
			</AspectRatio>
		</div>
		<div className='mint-card__meta'>
			<h3 className='mint-card__meta-h3 h3'>{piece.title}</h3>
			<p className='mint-card__meta-p'>
				{piece.isLive ? 'Minting Now' : 'Coming Soon'}
			</p>
			<p className='mint-card__meta-p2'>
				{piece.claim?.price ?? `${piece.contract.nativeSymbol} TBA`}
			</p>
		</div>
	</Button>
);
