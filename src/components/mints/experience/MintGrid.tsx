import type { MintSummary } from '@/types/mint';

import { MintCard } from './MintCard';

export type MintGridProps = {
	mints: MintSummary[];
	selectedId: string | null;
	onSelect: (mint: MintSummary) => void;
};

export const MintGrid = ({ mints, selectedId, onSelect }: MintGridProps) => (
	<section className='mint-grid-wrapper'>
		<div className='mint-grid'>
			{mints.map((piece) => (
				<MintCard
					key={`${piece.contract.slug}-${piece.id}`}
					piece={piece}
					isSelected={selectedId === piece.id}
					onSelect={() => onSelect(piece)}
				/>
			))}
		</div>
	</section>
);
