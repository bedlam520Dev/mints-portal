'use client';

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

import {
	DataPolicyContent,
	PrivacyContent,
	TermsContent,
} from './LegalContent';

type LegalView = 'terms' | 'privacy' | 'data';

type LegalOverlayContextValue = {
	openLegal: (view: LegalView) => void;
	closeLegal: () => void;
};

const LegalOverlayContext = createContext<LegalOverlayContextValue | null>(
	null
);

export const useLegalOverlay = (): LegalOverlayContextValue => {
	const ctx = useContext(LegalOverlayContext);
	if (!ctx) {
		throw new Error(
			'useLegalOverlay must be used within LegalOverlayProvider'
		);
	}
	return ctx;
};

type LegalOverlayProviderProps = {
	children: ReactNode;
};

export const LegalOverlayProvider = ({
	children,
}: LegalOverlayProviderProps) => {
	const [activeView, setActiveView] = useState<LegalView | null>(null);

	const openLegal = useCallback((view: LegalView) => {
		setActiveView(view);
	}, []);

	const closeLegal = useCallback(() => {
		setActiveView(null);
	}, []);

	return (
		<LegalOverlayContext.Provider value={{ openLegal, closeLegal }}>
			{children}
			{activeView && (
				<div className='fixed inset-0 z-40 flex items-center justify-center mint-bg-overlay backdrop-blur-md'>
					<div className='mint-overlay__panel max-h-[90vh] w-[min(960px,100%-2rem)] overflow-y-auto'>
						<button
							type='button'
							aria-label='Close legal information'
							onClick={closeLegal}
							className='mint-overlay__close'
						>
							×
						</button>
						{activeView === 'terms' && (
							<TermsContent mode='overlay' />
						)}
						{activeView === 'privacy' && (
							<PrivacyContent mode='overlay' />
						)}
						{activeView === 'data' && (
							<DataPolicyContent mode='overlay' />
						)}
					</div>
				</div>
			)}
		</LegalOverlayContext.Provider>
	);
};
