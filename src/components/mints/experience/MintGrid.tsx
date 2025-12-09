import type { MintSummary } from '@/types/mint';

import { MintCard } from './MintCard';

export type MintGridProps = {
	mints: MintSummary[];
	selectedId: string | null;
	onSelect: (mint: MintSummary) => void;
};

export const MintGrid = ({ mints, selectedId, onSelect }: MintGridProps) => (
	<section className='mint-grid relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center justify-self-center gap-x-10 gap-y-6 p-5 mx-6 my-20'>
		{mints.map((piece) => (
			<MintCard
				key={`${piece.contract.slug}-${piece.id}`}
				piece={piece}
				isSelected={selectedId === piece.id}
				onSelect={() => onSelect(piece)}
			/>
		))}
	</section>
);
