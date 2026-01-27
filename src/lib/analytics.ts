import { track } from '@vercel/analytics';

export type AnalyticsEvent =
	| 'mint_card_click'
	| 'buy_button_click'
	| 'filter_change'
	| 'sort_change'
	| 'profile_open'
	| 'wallet_connect'
	| 'mint_success'
	| 'mint_error'
	| 'page_view';

export type AnalyticsProperties = {
	// Mint events
	tokenId?: string;
	contractSlug?: string;
	mintTitle?: string;
	quantity?: number;
	price?: string;

	// Filter/Sort events
	filterValue?: string;
	sortValue?: string;

	// Error events
	errorMessage?: string;

	// Page view
	page?: string;
	referrer?: string;
};

export function trackEvent(event: AnalyticsEvent, properties?: AnalyticsProperties) {
	if (process.env.NODE_ENV === 'development') {
		console.log('[Analytics]', event, properties);
		return;
	}

	try {
		track(event, properties);
	} catch (error) {
		console.error('Analytics tracking error:', error);
	}
}

// Convenience functions for common events
export const analytics = {
	mintCardClick: (tokenId: string, contractSlug: string, title: string) =>
		trackEvent('mint_card_click', { tokenId, contractSlug, mintTitle: title }),

	buyButtonClick: (tokenId: string, contractSlug: string, quantity: number) =>
		trackEvent('buy_button_click', { tokenId, contractSlug, quantity }),

	filterChange: (filterValue: string) => trackEvent('filter_change', { filterValue }),

	sortChange: (sortValue: string) => trackEvent('sort_change', { sortValue }),

	profileOpen: () => trackEvent('profile_open'),

	walletConnect: () => trackEvent('wallet_connect'),

	mintSuccess: (tokenId: string, contractSlug: string) =>
		trackEvent('mint_success', { tokenId, contractSlug }),

	mintError: (errorMessage: string) => trackEvent('mint_error', { errorMessage }),

	pageView: (page: string, referrer?: string) =>
		trackEvent('page_view', { page, referrer }),
};
