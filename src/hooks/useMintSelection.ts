import type { MintSummary } from '@/types/mint';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useMintSelection = (mints: MintSummary[]) => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const selectedMint = useMemo(() => {
		if (!selectedId) return null;
		return mints.find((mint) => mint.id === selectedId) ?? null;
	}, [mints, selectedId]);

	const openSelection = useCallback((mint: MintSummary) => {
		setSelectedId(mint.id);
		setIsOpen(true);
	}, []);

	const closeSelection = useCallback(() => {
		setSelectedId(null);
		setIsOpen(false);
	}, []);

	const resetSelection = useCallback(() => {
		setSelectedId(null);
		setIsOpen(false);
	}, []);

	useEffect(() => {
		if (selectedId && !mints.some((mint) => mint.id === selectedId)) {
			// Reset selection if selected mint is no longer available
			// eslint-disable-next-line react-hooks/set-state-in-effect
			resetSelection();
		}
	}, [mints, selectedId, resetSelection]);

	return {
		selectedId,
		selectedMint,
		isOpen,
		openSelection,
		closeSelection,
		resetSelection,
	};
};
