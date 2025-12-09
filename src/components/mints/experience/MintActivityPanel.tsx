'use client';

import { useMemo } from 'react';
import { useActiveAccount } from 'thirdweb/react';

import { getContractConfig } from '@/config/contracts';
import { MintStatus, useMintActivity } from '@/lib/mints/activity';

const statusLabel: Record<MintStatus, string> = {
	pending: 'Pending',
	confirmed: 'Confirmed',
	failed: 'Failed',
};

const statusClasses: Record<MintStatus, string> = {
	pending: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/40',
	confirmed:
		'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40',
	failed: 'bg-rose-500/10 text-rose-300 border border-rose-500/40',
};

const formatTimestamp = (value: number): string => {
	if (!Number.isFinite(value)) return '';
	try {
		return new Intl.DateTimeFormat(undefined, {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(value));
	} catch {
		return '';
	}
};

export default function MintActivityPanel() {
	const account = useActiveAccount();
	const { items, clear } = useMintActivity();

	const walletAddress = account?.address ?? '';

	const filtered = useMemo(
		() =>
			walletAddress
				? items.filter(
						(item) =>
							item.walletAddress.toLowerCase() ===
							walletAddress.toLowerCase()
					)
				: [],
		[items, walletAddress]
	);

	if (!walletAddress) {
		return (
			<section className='w-full max-w-xl rounded-2xl mint-border mint-bg p-4 text-sm mint-muted-text mint-shadow-dark backdrop-blur'>
				<header className='mb-2 flex items-center justify-between gap-2'>
					<h2 className='text-xs font-semibold uppercase tracking-wide mint-muted-text'>
						Mint activity
					</h2>
				</header>
				<p className='text-xs mint-text'>
					Connect a wallet to see your recent mints.
				</p>
			</section>
		);
	}

	return (
		<section className='w-full max-w-xl rounded-2xl mint-border mint-bg p-4 text-sm mint-text mint-shadow-dark backdrop-blur'>
			<header className='mb-3 flex items-center justify-between gap-2'>
				<div className='flex flex-col'>
					<h2 className='text-xs font-semibold uppercase tracking-wide mint-muted-text'>
						Mint activity
					</h2>
					<span className='text-[11px] mint-text'>
						Wallet{' '}
						<span className='font-mono mint-muted-text'>
							{walletAddress.slice(0, 6)}…
							{walletAddress.slice(-4)}
						</span>
					</span>
				</div>
				<button
					type='button'
					onClick={clear}
					className='rounded-full mint-border mint-bg px-3 py-1 text-[11px] font-medium mint-muted-text hover:border-zinc-500 hover:bg-zinc-800 active:bg-zinc-900'
				>
					Clear
				</button>
			</header>

			{filtered.length === 0 ? (
				<p className='text-xs mint-text'>
					No recent mints for this wallet yet.
				</p>
			) : (
				<ul className='space-y-2'>
					{filtered.map((item) => {
						const config = getContractConfig(item.contractSlug);
						const chainName = config.chain?.name ?? 'Unknown chain';
						const currencySymbol =
							config.nativeCurrency?.symbol ?? 'ETH';

						return (
							<li
								key={item.id}
								className='flex items-start gap-3 rounded-xl mint-border mint-bg p-3'
							>
								<div className='mt-0.5 h-2 w-2 shrink-0 rounded-full mint-panel' />
								<div className='flex flex-1 flex-col gap-1'>
									<div className='flex flex-wrap items-center justify-between gap-2'>
										<div className='flex flex-col'>
											<span className='text-xs font-medium mint-text'>
												{config.label}
											</span>
											<span className='text-[11px] mint-text'>
												{chainName} •{' '}
												{config.standard.toUpperCase()}
											</span>
										</div>
										<span
											className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClasses[item.status]}`}
										>
											{statusLabel[item.status]}
										</span>
									</div>

									<div className='flex flex-wrap items-center gap-3 text-[11px] mint-muted-text'>
										<span>
											Token ID{' '}
											<span className='font-mono mint-text'>
												{item.tokenId}
											</span>
										</span>
										<span>×{item.quantity}</span>
										{item.txHash && (
											<span className='truncate font-mono mint-text'>
												tx: {item.txHash.slice(0, 8)}…
												{item.txHash.slice(-6)}
											</span>
										)}
									</div>

									<div className='flex flex-wrap items-center justify-between gap-2 text-[11px] mint-text'>
										<span>
											{formatTimestamp(item.createdAt)}
										</span>
										{config.nativeCurrency && (
											<span className='text-[10px] uppercase tracking-wide mint-text'>
												{currencySymbol}
											</span>
										)}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
