'use client';

import { Button } from '@/components/ui/button';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

import { DataPolicyContent, PrivacyContent, TermsContent } from './LegalContent';

type LegalView = 'terms' | 'privacy' | 'data';

type LegalOverlayContextValue = {
	openLegal: (view: LegalView) => void;
	closeLegal: () => void;
};

const LegalOverlayContext = createContext<LegalOverlayContextValue | null>(null);

export const useLegalOverlay = (): LegalOverlayContextValue => {
	const ctx = useContext(LegalOverlayContext);
	if (!ctx) {
		throw new Error('useLegalOverlay must be used within a LegalOverlayProvider');
	}
	return ctx;
};

type LegalOverlayProviderProps = {
	children: ReactNode;
};

export const LegalOverlayProvider = ({ children }: LegalOverlayProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeView, setActiveView] = useState<LegalView>('terms');

	const openLegal = useCallback((view: LegalView) => {
		setActiveView(view);
		setIsOpen(true);
	}, []);

	const closeLegal = useCallback(() => setIsOpen(false), []);

	const value = useMemo(() => ({ openLegal, closeLegal }), [openLegal, closeLegal]);

	const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target === event.currentTarget) {
			closeLegal();
		}
	};

	return (
		<LegalOverlayContext.Provider value={value}>
			{children}
			{isOpen && (
				<div
					className='mint-overlay'
					role='dialog'
					aria-modal='true'
					aria-label='Legal information'
					onClick={handleBackdropClick}
				>
					<div className='legal-overlay__panel'>
						<Button
							type='button'
							variant='ghost'
							aria-label='Close legal information'
							onClick={closeLegal}
							className='mint-overlay__close'
						>
							×
						</Button>
						{activeView === 'terms' && <TermsContent mode='overlay' />}
						{activeView === 'privacy' && <PrivacyContent mode='overlay' />}
						{activeView === 'data' && <DataPolicyContent mode='overlay' />}
					</div>
				</div>
			)}
		</LegalOverlayContext.Provider>
	);
};
