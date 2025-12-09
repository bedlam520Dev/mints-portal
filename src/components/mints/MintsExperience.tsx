'use client';

import { useEffect, useMemo, useState } from 'react';

import {
	ContractFilter,
	HeaderBar,
	HeroSection,
	MintFooter,
	MintGrid,
	MintOverlay,
	type StatusMessage,
} from '@/components/mints/experience';
import {
	getFallbackContract,
	getFallbackMints,
} from '@/components/mints/experience/fallbacks';
import MintActivityPanel from '@/components/mints/experience/MintActivityPanel';
import { dropContracts } from '@/config/contracts';
import { useMintCatalog } from '@/hooks/useMintCatalog';
import { useMintDetail } from '@/hooks/useMintDetail';
import { useMintSelection } from '@/hooks/useMintSelection';
import { useMintTransaction } from '@/hooks/useMintTransaction';
import type { ContractRef, MintSummary } from '@/types/mint';

const FALLBACK_CONTRACT: ContractRef = getFallbackContract();
const FALLBACK_MINTS: MintSummary[] = getFallbackMints();

export const MintsExperience = () => {
	const hasMultipleContracts = dropContracts.length > 1;
	const [activeFilter, setActiveFilter] = useState<string>(
		hasMultipleContracts ? 'all' : (dropContracts[0]?.slug ?? 'all')
	);
	const { mints, isLoading, error, refetch } = useMintCatalog(
		activeFilter === 'all' ? undefined : activeFilter
	);
	const displayedMints = mints.length ? mints : FALLBACK_MINTS;
	const {
		selectedId,
		selectedMint,
		isOpen: isOverlayOpen,
		openSelection,
		closeSelection,
		resetSelection,
	} = useMintSelection(displayedMints);
	const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(
		null
	);
	const {
		buy,
		isPending,
		error: mintError,
		resetError,
	} = useMintTransaction();

	const detailTokenId = selectedMint?.tokenId ?? null;
	const detailContractSlug = selectedMint?.contract.slug ?? null;
	const { mint: detailMint, isLoading: isDetailLoading } = useMintDetail(
		detailContractSlug,
		detailTokenId
	);
	const activeMint = detailMint ?? selectedMint;

	useEffect(() => {
		if (mintError) {
			setStatusMessage({ type: 'error', message: mintError.message });
		}
	}, [mintError]);

	useEffect(() => {
		resetSelection();
		resetError();
	}, [activeFilter, resetSelection, resetError]);

	const handleCardSelect = (mint: MintSummary) => {
		openSelection(mint);
		setStatusMessage(null);
		resetError();
	};

	const handleCloseOverlay = () => {
		closeSelection();
		setStatusMessage(null);
		resetError();
	};

	const handleBuy = async (
		tokenId: string,
		contractSlug: string,
		quantity: number
	) => {
		setStatusMessage(null);
		resetError();
		try {
			await buy({ tokenId, contractSlug, quantity });
			setStatusMessage({
				type: 'success',
				message:
					'Transaction submitted. Approve it in your wallet to mint.',
			});
			await refetch();
		} catch (err) {
			const message = (err as Error)?.message ?? 'Transaction failed';
			setStatusMessage({ type: 'error', message });
		}
	};

	const contractFilterValue = useMemo(() => activeFilter, [activeFilter]);

	return (
		<div className='mint-background'>
			<div className='mint-page mint-shell'>
				<HeaderBar />
				<div className='mint-stage'>
					<div className='mint-column'>
						<HeroSection />
						{hasMultipleContracts && (
							<ContractFilter
								value={contractFilterValue}
								onChange={setActiveFilter}
							/>
						)}
						{isLoading && (
							<p className='px-5 text-center text-sm mint-success-text'>
								Loading on-chain data…
							</p>
						)}
						{error && (
							<p className='px-5 text-center text-sm mint-danger-text'>
								Unable to reach the mint API. Showing the latest
								cached layout.
							</p>
						)}
						<MintGrid
							mints={displayedMints}
							selectedId={selectedId}
							onSelect={handleCardSelect}
						/>
						<MintFooter />
					</div>
				</div>
			</div>
			{isOverlayOpen && activeMint && (
				<MintOverlay
					piece={activeMint}
					isDetailLoading={isDetailLoading}
					isBuying={isPending}
					onBuyAction={handleBuy}
					status={statusMessage}
					onCloseAction={handleCloseOverlay}
				/>
			)}
			<MintActivityPanel />
		</div>
	);
};

export default MintsExperience;
