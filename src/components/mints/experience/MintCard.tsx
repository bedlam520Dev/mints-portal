import Image from 'next/image';

import type { MintSummary } from '@/types/mint';

import { fallbackNftImage } from './constants';

export type MintCardProps = {
	piece: MintSummary;
	isSelected: boolean;
	onSelect: () => void;
};

export const MintCard = ({ piece, isSelected, onSelect }: MintCardProps) => (
	<button
		type='button'
		onClick={onSelect}
		className={`relative mint-card mint-card:hover mint-cyan-glow-sm-panel md:mint-cyan-glow-panel lg:mint-cyan-glow-panel xl:mint-cyan-glow-panel text-left ${
			isSelected
				? 'outline outline-cyan-300/60 ring-offset-2 ring-cyan-400/60'
				: ''
		}`}
		aria-pressed={isSelected}
	>
		<div className='relative mint-card__media mint-purple-glow-sm-img md:mint-purple-glow-img lg:mint-purple-glow-img xl:mint-purple-glow glow-shift-sm-img'>
			<Image
				src={piece.image ?? fallbackNftImage}
				alt={piece.title}
				width={360}
				height={360}
				className={`relative h-auto w-full object-cover ${piece.isLive ? '' : 'opacity-80'}`}
			/>
		</div>
		<div className='relative mint-card__meta mint-gradient-text px-2 pt-6 pb-3'>
			<p className='relative text-xs uppercase tracking-[0.3em] mint-gradient-text'>
				{piece.contract.label}
			</p>
			<h3 className='relative text-2xl font-semibold'>{piece.title}</h3>
			<p className='relative text-xs uppercase tracking-[0.3em] mint-gradient-text'>
				{piece.standard === 'erc721'
					? 'ERC721 Collection'
					: 'ERC1155 Edition'}
			</p>
			<p className='relative text-sm mint-gradient-text line-clamp-2'>
				{piece.description}
			</p>
			<p className='relative text-xs mint-gradient-text'>
				{piece.mintedLabel}
			</p>
			<p className='relative text-xs font-semibold'>
				{piece.claim?.price ??
					`${piece.contract.nativeSymbol} price TBA`}
			</p>
			{!piece.isLive && (
				<span className='relative text-xs uppercase tracking-[0.3em] mint-gradient-text'>
					Preview
				</span>
			)}
		</div>
	</button>
);
