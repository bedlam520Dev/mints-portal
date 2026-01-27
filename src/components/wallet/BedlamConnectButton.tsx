'use client';

import { client } from '@/app/client';
import { primaryChain, supportedChains } from '@/config/chains';
import { env } from '@/config/env';
import { bedlamWallets } from '@/config/wallets';
import {
	useActiveAccount,
	useConnectModal,
	useWalletDetailsModal,
} from 'thirdweb/react';

import { logoImage } from '../mints/experience/constants';

const connectModal = {
	size: 'compact' as const,
	title: 'Welcome...',
	titleIcon: logoImage,
	termsOfServiceUrl: '/terms',
	privacyPolicyUrl: '/privacy',
	requireApproval: true,
	showThirdwebBranding: true,
};

const connectTheme = {
	type: 'dark' as const,
	fontFamily: 'inherit',
	colors: {
		accentButtonBg: 'var(--mint-hero-gradient)',
		accentButtonText: 'var(--mint-text)',
		accentText: 'var(--mint-aegean)',
		borderColor: 'var(--mint-border)',
		connectedButtonBg: 'var(--mint-transparent)',
		connectedButtonBgHover: 'var(--mint-panel)',
		danger: 'var(--destructive)',
		destructive: 'var(--destructive)',
		inputAutofillBg: 'var(--mint-panel)',
		modalBg: 'var(--mint-surface)',
		modalOverlayBg: 'var(--mint-overlay-bg)',
		primaryButtonBg: 'var(--mint-hero-gradient)',
		primaryButtonText: 'var(--mint-text)',
		primaryText: 'var(--mint-text)',
		secondaryButtonBg: 'var(--mint-panel)',
		secondaryButtonHoverBg: 'var(--mint-aegean-strong)',
		secondaryButtonText: 'var(--mint-text)',
		secondaryIconColor: 'var(--mint-aegean)',
		secondaryIconHoverBg: 'var(--mint-panel)',
		secondaryIconHoverColor: 'var(--mint-text)',
		secondaryText: 'var(--mint-muted-text)',
		selectedTextBg: 'var(--mint-aegean-strong)',
		selectedTextColor: 'var(--mint-text)',
		separatorLine: 'var(--mint-b-border)',
		skeletonBg: 'var(--mint-panel)',
		scrollbarBg: 'var(--mint-bg)',
		success: 'var(--success)',
		tertiaryBg: 'var(--mint-panel)',
		tooltipBg: 'var(--mint-panel)',
		tooltipText: 'var(--mint-text)',
	},
};

const accountAbstraction = env.enableAccountAbstraction
	? {
			chain: primaryChain,
			sponsorGas: false,
		}
	: undefined;

function shortAddress(address: string): string {
	const a = address.trim();
	if (a.length <= 12) return a;
	return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export const BedlamConnectButton = () => {
	const account = useActiveAccount();

	const { connect, isConnecting } = useConnectModal();
	const walletDetailsModal = useWalletDetailsModal();

	const openConnect = async () => {
		await connect({
			client,
			chain: primaryChain,
			chains: supportedChains,
			wallets: bedlamWallets,
			theme: connectTheme,
			...connectModal,
			accountAbstraction,
			appMetadata: {
				name: 'BEDLAM520nft Mints Portal',
				url: '/index',
			},
		});
	};

	const openDetails = () => {
		walletDetailsModal.open({
			client,
			theme: connectTheme,
		});
	};

	return (
		<div className='connect-shell relative flex flex-col'>
			{account ? (
				<button
					type='button'
					onClick={openDetails}
					className='connected-button shadow-neon-gradient-glow-v2 connected-button:hover connected-button::after'
					aria-label='Wallet connected. Open wallet details.'
				>
					<span className='connected-button__label'>Wallet</span>
					<span className='connected-button__addr'>
						{shortAddress(account.address)}
					</span>
				</button>
			) : (
				<button
					type='button'
					onClick={() => void openConnect()}
					className='connect-button shadow-neon-gradient-glow-v2 connect-button:hover connect-button:focus-visible connect-button::after'
					disabled={isConnecting}
					aria-busy={isConnecting}
					aria-label='Connect wallet'
				>
					{isConnecting ? 'Connecting…' : 'Connect Wallet'}
				</button>
			)}
		</div>
	);
};

export default BedlamConnectButton;
