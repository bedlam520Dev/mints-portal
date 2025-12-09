'use client';

import Image from 'next/image';
import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';

import { formatDateTime } from '@/lib/mints/formatters';
import type { MintSummary } from '@/types/mint';

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

	useEffect(() => {
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
		claim?.maxClaimableSupply &&
		!Number.isNaN(Number(claim.maxClaimableSupply))
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
			onMouseDown={handleOverlayClick}
		>
			<div className='mint-overlay__panel mint-cyan-glow-sm-panel md:mint-cyan-glow-panel lg:mint-cyan-glow-panel xl:mint-cyan-glow-panel'>
				<button
					type='button'
					className='mint-overlay__close'
					onClick={onCloseAction}
					aria-label='Close mint overlay'
				>
					⨉
				</button>
				<div className='relative mint-modal-grid'>
					<div className='relative mint-modal-image overflow-hidden mint-purple-glow-img md:mint-purple-glow-img lg:mint-purple-glow-img xl:mint-purple-glow-img'>
						<Image
							src={piece.image ?? fallbackNftImage}
							alt={piece.title}
							width={420}
							height={420}
							className='relative h-full w-full object-cover'
						/>
					</div>
					<div className='relative mint-modal-meta space-y-4'>
						<div>
							{/* <p className='relative text-xs uppercase tracking-[0.3em] mint-gradient-text'>
								{piece.contract.label} ·{' '}
								{piece.contract.chainName} ·{' '}
								{piece.standard.toUpperCase()}
							</p> */}
							<h2 className='relative text-3xl font-semibold mint-gradient-text mb-4 pt-2'>
								{piece.title}
							</h2>
							<p className='relative text-sm'>
								{piece.description}
							</p>
						</div>
						<ul className='relative space-y-1'>
							<li>
								<span className='relative mint-gradient-text'>
									Price ·{' '}
								</span>
								{claim?.price ??
									`${piece.contract.nativeSymbol} price TBD`}
							</li>
							<li>
								<span className='relative mint-gradient-text'>
									Supply ·{' '}
								</span>
								{piece.mintedLabel}
							</li>
							<li>
								<span className='relative mint-gradient-text'>
									Per wallet ·{' '}
								</span>
								{quantityLimit
									? `${quantityLimit} max`
									: 'Open'}
							</li>
							<li>
								<span className='relative mint-gradient-text'>
									Claim window ·{' '}
								</span>
								{formatDateTime(claim?.startTimestamp ?? null)}
							</li>
						</ul>
						<div className='relative flex flex-wrap gap-2'>
							{piece.attributes.length === 0 ? (
								<span className='relative rounded-lg mint-alt-border px-3 py-1 text-sm mint-gradient-text'>
									Traits reveal soon
								</span>
							) : (
								piece.attributes.map((attr) => (
									<span
										key={`${piece.id}-${attr.label}-${attr.value}`}
										className='relative rounded-lg mint-alt-border px-3 py-1 text-sm mint-gradient-text'
									>
										{attr.label}:{' '}
										<span className='relative'>
											{attr.value}
										</span>
									</span>
								))
							)}
							{claim?.allowlistRequired && (
								<span className='relative rounded-lg mint-alt-border px-3 py-1 text-sm mint-gradient-text'>
									Allowlist Required
								</span>
							)}
						</div>
						{isDetailLoading && (
							<p className='relative text-xs uppercase tracking-[0.3em] mint-gradient-text'>
								Refreshing on-chain data…
							</p>
						)}
					</div>
				</div>
				<form
					className='relative mint-modal-form mt-6 space-y-3'
					onSubmit={handleSubmit}
				>
					<label
						className='relative text-md uppercase tracking-[0.3em] mint-gradient-text'
						htmlFor='quantity-input'
					>
						Quantity
					</label>
					<input
						id='quantity-input'
						type='number'
						min={1}
						max={maxInput}
						value={quantity}
						onChange={(event) =>
							setQuantity(Math.max(1, Number(event.target.value)))
						}
						className='relative rounded-xl mint-alt-border mint-bg-grey ml-3 px-4 py-2 mint-gradient-text focus:outline-none focus:ring-2 focus:ring-cyan-400'
						disabled={!piece.isLive || isBuying}
					/>
					<button
						type='submit'
						className='relative flex flex-col action-chip mint-purple-glow-sm md:mint-purple-glow lg:mint-purple-glow xl:mint-purple-glow ml-6'
						disabled={!piece.isLive || isBuying}
					>
						{piece.isLive
							? isBuying
								? 'Minting…'
								: 'Buy NFT'
							: 'Coming Soon'}
					</button>
					{status && (
						<p
							className={`mint-status ${
								status.type === 'error'
									? 'mint-status--error'
									: 'mint-status--success'
							}`}
						>
							{status.message}
						</p>
					)}
					{/* {claim?.allowlistRequired && (
						<p className='relative text-xs text-color-grey-63'>
							This drop enforces a Merkle allowlist. Ensure the
							connected wallet is on the list before submitting a
							claim.
						</p>
					)} */}
				</form>
			</div>
		</div>
	);
};
