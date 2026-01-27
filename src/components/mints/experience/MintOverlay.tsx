'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { formatDateTime } from '@/lib/mints/formatters';
import type { MintSummary } from '@/types/mint';
import Image from 'next/image';
import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';

import { fallbackNftImage } from './constants';
import type { StatusMessage } from './types';

export type MintOverlayProps = {
	piece: MintSummary;
	isDetailLoading: boolean;
	isBuying: boolean;
	onBuyAction: (
		tokenId: string,
		contractSlug: string,
		quantity: number
	) => Promise<void>;
	status: StatusMessage | null;
	onCloseAction: () => void;
};

export const MintOverlay = ({
	piece,
	isDetailLoading,
	isBuying,
	onBuyAction,
	status,
	onCloseAction,
}: MintOverlayProps) => {
	const [quantity, setQuantity] = useState(1);
	const overlayRef = useFocusTrap<HTMLDivElement>(true);

	useEffect(() => {
		// Reset quantity when piece changes
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setQuantity(1);
	}, [piece.id]);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onCloseAction();
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [onCloseAction]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!piece.isLive || isBuying) return;
		await onBuyAction(piece.tokenId, piece.contract.slug, quantity);
	};

	const claim = piece.claim;
	const quantityLimit = claim?.quantityLimitPerWallet
		? Number(claim.quantityLimitPerWallet)
		: undefined;
	const maxInput =
		claim?.maxClaimableSupply && !Number.isNaN(Number(claim.maxClaimableSupply))
			? Number(claim.maxClaimableSupply)
			: undefined;

	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onCloseAction();
		}
	};

	return (
		<div
			className='mint-overlay'
			role='dialog'
			aria-modal='true'
			aria-labelledby='mint-overlay-title'
			onMouseDown={handleOverlayClick}
		>
			<div
				ref={overlayRef}
				className='mint-overlay__panel'
			>
				<Button
					type='button'
					variant='ghost'
					className='mint-overlay__close'
					onClick={onCloseAction}
					aria-label='Close mint overlay'
				>
					⨉
				</Button>
				<div className='mint-modal-grid'>
					<div className='mint-modal-image-wrapper'>
						<AspectRatio ratio={1}>
							<Image
								src={piece.image ?? fallbackNftImage}
								alt={piece.title}
								width={420}
								height={420}
								className='mint-modal-image'
							/>
						</AspectRatio>
					</div>
					<div className='mint-modal-meta'>
						<div>
							<h2 className='mint-modal-meta-h2'>{piece.title}</h2>
							<p className='mint-modal-meta-p'>{piece.description}</p>
						</div>
						<ul className='mint-modal-meta-ul'>
							<li>
								<span className='mint-modal-meta-span'>Price · </span>
								{claim?.price ?? `${piece.contract.nativeSymbol} price TBD`}
							</li>
							<li>
								<span className='mint-modal-meta-span'>Supply · </span>
								{piece.mintedLabel}
							</li>
							<li>
								<span className='mint-modal-meta-span'>Per wallet · </span>
								{quantityLimit ? `${quantityLimit} max` : 'Open'}
							</li>
							<li>
								<span className='mint-modal-meta-span'>Claim window · </span>
								{formatDateTime(claim?.startTimestamp ?? null)}
							</li>
						</ul>
						<div className='mint-modal-meta-attributes-wrapper'>
							{piece.attributes.length === 0 ? (
								<span className='mint-modal-meta-attributes-span'>
									Traits reveal soon
								</span>
							) : (
								piece.attributes.map((attr) => (
									<span
										key={`${piece.id}-${attr.label}-${attr.value}`}
										className='mint-modal-meta-attributes-span'
									>
										{attr.label}:{' '}
										<span className='mint-modal-meta-attributes-span relative'>
											{attr.value}
										</span>
									</span>
								))
							)}
							{claim?.allowlistRequired && (
								<span className='mint-modal-meta-attributes-span'>
									Allowlist Required
								</span>
							)}
						</div>
						{isDetailLoading && (
							<div className='mint-modal-meta-loading flex'>
								<Spinner className='mint-modal-meta-spinner' />
								<p className='mint-modal-meta-p'>Refreshing on-chain data…</p>
							</div>
						)}
					</div>
				</div>
				<section className='modal-separator mint-border border'></section>
				<form
					className='mint-modal-form'
					onSubmit={(e) => void handleSubmit(e)}
				>
					<Label
						className='mint-modal-label'
						htmlFor='quantity-input'
					>
						Quantity
					</Label>
					<Input
						id='quantity-input'
						type='number'
						min={1}
						max={maxInput}
						value={quantity}
						onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
						className='mint-modal-input'
						disabled={!piece.isLive || isBuying}
					/>
					<Button
						type='submit'
						variant='default'
						className='mint-action-button'
						disabled={!piece.isLive || isBuying}
					>
						{piece.isLive ? (
							isBuying ? (
								<>
									<Spinner className='mint-modal-buying-spinner' />
									Minting…
								</>
							) : (
								'Buy NFT'
							)
						) : (
							'Coming Soon'
						)}
					</Button>
					{status && (
						<p
							className={`mint-status ${
								status.type === 'error' ? 'mint-status--error' : 'mint-status--success'
							}`}
						>
							{status.message}
						</p>
					)}
					{claim?.allowlistRequired && (
						<p className='mint-modal-meta-p'>
							This drop enforces a Merkle allowlist. Ensure the connected wallet is on
							the list before submitting a claim.
						</p>
					)}
				</form>
			</div>
		</div>
	);
};
