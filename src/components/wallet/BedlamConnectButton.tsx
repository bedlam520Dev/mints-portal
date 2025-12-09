'use client';
import { ConnectButton, darkTheme } from 'thirdweb/react';

import { client } from '@/app/client';
import { primaryChain, supportedChains } from '@/config/chains';
import { bedlamWallets } from '@/config/wallets';

const connectTheme = darkTheme({
	colors: {
		accentButtonBg: 'var(--mint-hero-gradient)',
		accentButtonText: 'var(--mint-text)',
		accentText: 'var(--mint-cyan)',
		borderColor: 'var(--mint-border)',
		connectedButtonBg: 'var(--mint-transparent)',
		connectedButtonBgHover: 'var(--mint-panel)',
		danger: 'var(--mint-danger)',
		inputAutofillBg: 'var(--mint-panel)',
		modalBg: 'var(--mint-surface)',
		modalOverlayBg: 'var(--mint-overlay-bg)',
		primaryButtonBg: 'var(--mint-hero-gradient)',
		primaryButtonText: 'var(--mint-text)',
		primaryText: 'var(--mint-text)',
		secondaryButtonBg: 'var(--mint-panel)',
		secondaryButtonHoverBg: 'var(--mint-cyan-strong)',
		secondaryButtonText: 'var(--mint-text)',
		secondaryIconColor: 'var(--mint-cyan)',
		secondaryIconHoverBg: 'var(--mint-panel)',
		secondaryIconHoverColor: 'var(--mint-text)',
		secondaryText: 'var(--mint-muted)',
		selectedTextBg: 'var(--mint-cyan-strong)',
		selectedTextColor: 'var(--mint-text)',
		separatorLine: 'var(--mint-alt-border)',
		skeletonBg: 'var(--mint-panel)',
		scrollbarBg: 'var(--mint-bg)',
		success: 'var(--mint-success)',
		tertiaryBg: 'var(--mint-panel)',
		tooltipBg: 'var(--mint-panel)',
		tooltipText: 'var(--mint-text)',
	},
});

const connectModal = {
	size: 'compact' as const,
	title: 'Welcome...',
	titleIcon: '/1024x1024.png',
	termsOfServiceUrl: '/terms',
	privacyPolicyUrl: '/privacy',
	requireApproval: true,
	showThirdwebBranding: true,
};

export const BedlamConnectButton = () => (
	<div className='connect-shell h-[40px] sm:h-[40px] lg:h-16 xl:h-[56px]'>
		<ConnectButton
			client={client}
			chain={primaryChain}
			chains={supportedChains}
			wallets={bedlamWallets}
			theme={connectTheme}
			connectButton={{
				label: 'Connect Wallet',
				className:
					'connect-button h-[40px] sm:h-[40px] lg:h-16 xl:h-[56px]',
			}}
			connectModal={connectModal}
			detailsButton={{
				className:
					'connected-button h-[40px] sm:h-[40px] lg:h-16 xl:h-[56px]',
			}}
			detailsModal={{
				showBalanceInFiat: 'USD',
				assetTabs: ['token', 'nft'] as const,
				showTestnetFaucet: true,
				manageWallet: {
					allowLinkingProfiles: false,
				},
			}}
			accountAbstraction={{
				chain: primaryChain,
				sponsorGas: false,
			}}
			appMetadata={{
				name: 'BEDLAM520nft Mints Portal',
				url: '/index',
			}}
		/>
	</div>
);

export default BedlamConnectButton;
    
