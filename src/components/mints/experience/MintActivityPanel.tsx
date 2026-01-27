'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getContractConfig } from '@/config/contracts';
import { MintStatus, useMintActivity } from '@/lib/mints/activity';
import { useMemo } from 'react';
import { useActiveAccount } from 'thirdweb/react';

const statusLabel: Record<MintStatus, string> = {
	pending: 'Pending',
	confirmed: 'Confirmed',
	failed: 'Failed',
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
						(item) => item.walletAddress.toLowerCase() === walletAddress.toLowerCase()
					)
				: [],
		[items, walletAddress]
	);

	if (!walletAddress) {
		return (
			<section className='mint-activity-panel-section'>
				<header className='mint-activity-panel-header'>
					<h2 className='mint-activity-panel-h2'>Mint activity</h2>
				</header>
				<p className='mint-activity-panel-p'>
					Connect a wallet to see your recent mints.
				</p>
			</section>
		);
	}

	return (
		<section className='mint-activity-panel-section'>
			<header className='mint-activity-panel-header'>
				<div className='flex flex-col'>
					<h2 className='mint-activity-panel-h2'>Mint activity</h2>
					<span className='activity-header-wallet'>
						Wallet{' '}
						<span className='activity-header-wallet-address'>
							{walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}
						</span>
					</span>
				</div>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					onClick={clear}
					className='activity-clear-button'
				>
					Clear
				</Button>
			</header>

			{filtered.length === 0 ? (
				<p className='mint-activity-panel-p'>No mints found for this wallet.</p>
			) : (
				<ul className='activity-list'>
					{filtered.map((item) => {
						const config = getContractConfig(item.contractSlug);
						const chainName = config.chain?.name ?? 'Unknown chain';
						const currencySymbol = config.nativeCurrency?.symbol ?? 'ETH';

						return (
							<li
								key={item.id}
								className='activity-item'
							>
								<div className='activity-item-indicator' />
								<div className='activity-item-content'>
									<div className='activity-item-header'>
										<div className='activity-item-title'>
											<span className='activity-item-title-text'>{config.label}</span>
											<span className='activity-item-subtitle'>
												{chainName} • {config.standard.toUpperCase()}
											</span>
										</div>
										<Badge
											variant='outline'
											className={`activity-status-badge activity-status-${item.status}`}
										>
											{statusLabel[item.status]}
										</Badge>
									</div>

									<div className='activity-item-meta'>
										<span>
											Token ID{' '}
											<span className='activity-item-meta-value'>{item.tokenId}</span>
										</span>
										<span>×{item.quantity}</span>
										{item.txHash && (
											<span className='activity-item-meta-hash'>
												tx: {item.txHash.slice(0, 8)}…{item.txHash.slice(-6)}
											</span>
										)}
									</div>

									<div className='activity-item-footer'>
										<span>{formatTimestamp(item.createdAt)}</span>
										{config.nativeCurrency && (
											<span className='activity-item-currency'>{currencySymbol}</span>
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
