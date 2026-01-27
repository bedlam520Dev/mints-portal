'use client';

import {
	FilterBar,
	HeaderBar,
	HeroSection,
	MintFooter,
	MintGrid,
	MintCardSkeleton,
	type StatusMessage,
} from '@/components/mints/experience';
import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';

const MintOverlay = dynamic(
	() =>
		import('@/components/mints/experience/MintOverlay').then((mod) => ({
			default: mod.MintOverlay,
		})),
	{
		loading: () => (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
				<Spinner />
			</div>
		),
		ssr: false,
	}
);

const InfiniteSliderHoverSpeed = dynamic(
	() =>
		import('@/components/InfiniteSlider').then((mod) => ({
			default: mod.InfiniteSliderHoverSpeed,
		})),
	{
		loading: () => <div className='h-64 animate-pulse bg-muted/20' />,
		ssr: false,
	}
);
import {
	getFallbackContract,
	getFallbackMints,
} from '@/components/mints/experience/fallbacks';
import { ProfileOverlayProvider } from '@/components/profile/ProfileOverlayProvider';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { dropContracts } from '@/config/contracts';
import { useMintCatalog } from '@/hooks/useMintCatalog';
import { useMintDetail } from '@/hooks/useMintDetail';
import { useMintSelection } from '@/hooks/useMintSelection';
import { useServerMintTransaction } from '@/hooks/useServerMintTransaction';
import { analytics } from '@/lib/analytics';
import type { ContractRef, MintSummary } from '@/types/mint';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

const _FALLBACK_CONTRACT: ContractRef = getFallbackContract();
const FALLBACK_MINTS: MintSummary[] = getFallbackMints();

export default function Page() {
	const hasMultipleContracts = dropContracts.length > 1;

	const [activeFilter, setActiveFilter] = useState<string>(
		hasMultipleContracts ? 'all' : (dropContracts[0]?.slug ?? 'all')
	);
	const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

	const { mints, isLoading, error, refetch } = useMintCatalog(
		activeFilter === 'all' ? undefined : activeFilter
	);

	const sortedMints = useMemo(() => {
		const mintsToSort = mints.length ? [...mints] : [...FALLBACK_MINTS];
		if (sortBy === 'name') {
			return mintsToSort.sort((a, b) => a.title.localeCompare(b.title));
		}
		return mintsToSort.sort((a, b) => Number(a.tokenId) - Number(b.tokenId));
	}, [mints, sortBy]);

	const displayedMints = sortedMints;

	const {
		selectedId,
		selectedMint,
		isOpen: isOverlayOpen,
		openSelection,
		closeSelection,
		resetSelection,
	} = useMintSelection(displayedMints);

	const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

	const { buy, isPending, resetError } = useServerMintTransaction();

	const detailTokenId = selectedMint?.tokenId ?? null;
	const detailContractSlug = selectedMint?.contract.slug ?? null;

	const { mint: detailMint, isLoading: isDetailLoading } = useMintDetail(
		detailContractSlug,
		detailTokenId
	);

	const activeMint = detailMint ?? selectedMint;

	useEffect(() => {
		resetSelection();
		resetError();
	}, [activeFilter, resetSelection, resetError]);

	const handleCardSelect = (mint: MintSummary) => {
		openSelection(mint);
		setStatusMessage(null);
		resetError();
		analytics.mintCardClick(mint.tokenId, mint.contract.slug, mint.title);
	};

	const handleCloseOverlay = () => {
		closeSelection();
		setStatusMessage(null);
		resetError();
	};

	const handleBuy = async (tokenId: string, contractSlug: string, quantity: number) => {
		setStatusMessage(null);
		resetError();
		analytics.buyButtonClick(tokenId, contractSlug, quantity);

		try {
			await buy({ tokenId, contractSlug, quantity });
			toast.success('Mint successful!', {
				description:
					'Transaction submitted via server wallet. Check your wallet for the NFT.',
			});
			setStatusMessage({
				type: 'success',
				message:
					'Transaction submitted via server wallet. Approve any prompts in your wallet or explorer.',
			});
			analytics.mintSuccess(tokenId, contractSlug);
			await refetch();
		} catch (err) {
			const message = (err as Error)?.message ?? 'Transaction failed';
			setStatusMessage({ type: 'error', message });
			analytics.mintError(message);
		}
	};

	return (
		<ProfileOverlayProvider>
			<div className='mint-background'>
				<div className='mint-page'>
					<HeaderBar />
					<section className='separator mint-border border'></section>
					<div
						id='main-content'
						className='mint-stage'
					>
						<div className='mint-column'>
							<HeroSection />
							<section
								className='separator mint-border mt-6 mb-2 border'
								style={{ height: '0.2rem' }}
							></section>
							<FilterBar
								selectedContract={activeFilter}
								sortBy={sortBy}
								onContractChangeAction={setActiveFilter}
								onSortChangeAction={setSortBy}
							/>
							<section
								className='separator mint-border mt-2 mb-6 border'
								style={{ height: '0.2rem' }}
							></section>
							{error && (
								<p
									className='destructive-text px-5 text-center text-sm'
									role='alert'
									aria-live='polite'
								>
									Unable to reach the mint API. Showing the latest cached layout.
								</p>
							)}
							{isLoading ? (
								<section
									className='mint-grid-wrapper'
									aria-busy='true'
									aria-label='Loading mints'
								>
									<div className='mint-grid'>
										{Array.from({ length: 6 }).map((_, i) => (
											<MintCardSkeleton key={i} />
										))}
									</div>
								</section>
							) : (
								<ErrorBoundary>
									<MintGrid
										mints={displayedMints}
										selectedId={selectedId}
										onSelect={handleCardSelect}
									/>
								</ErrorBoundary>
							)}
							<section className='separator mint-border border'></section>
							<InfiniteSliderHoverSpeed />
							<section className='separator mint-border border'></section>
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
			</div>
		</ProfileOverlayProvider>
	);
}
