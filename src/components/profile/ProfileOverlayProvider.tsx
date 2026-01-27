'use client';

import { Button } from '@/components/ui/button';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { analytics } from '@/lib/analytics';
import dynamic from 'next/dynamic';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

const ProfileContent = dynamic(() =>
	import('./ProfileContent').then((mod) => ({ default: mod.ProfileContent }))
);

type ProfileOverlayContextValue = {
	openProfile: () => void;
	closeProfile: () => void;
};

const ProfileOverlayContext = createContext<ProfileOverlayContextValue | null>(null);

export const useProfileOverlay = (): ProfileOverlayContextValue => {
	const ctx = useContext(ProfileOverlayContext);
	if (!ctx) {
		throw new Error('useProfileOverlay must be used within a ProfileOverlayProvider');
	}
	return ctx;
};

type ProfileOverlayProviderProps = {
	children: ReactNode;
};

export const ProfileOverlayProvider = ({ children }: ProfileOverlayProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useFocusTrap<HTMLDivElement>(isOpen);

	const openProfile = useCallback(() => {
		setIsOpen(true);
		analytics.profileOpen();
	}, []);
	const closeProfile = useCallback(() => setIsOpen(false), []);

	const value = useMemo(
		() => ({ openProfile, closeProfile }),
		[openProfile, closeProfile]
	);

	const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target === event.currentTarget) {
			closeProfile();
		}
	};

	return (
		<ProfileOverlayContext.Provider value={value}>
			{children}
			{isOpen && (
				<div
					className='mint-overlay'
					role='dialog'
					aria-modal='true'
					aria-labelledby='profile-title'
					onClick={handleBackdropClick}
				>
					<div
						ref={panelRef}
						className='profile-overlay__panel'
					>
						<Button
							type='button'
							variant='ghost'
							aria-label='Close profile'
							onClick={closeProfile}
							className='mint-overlay__close'
						>
							×
						</Button>
						<ProfileContent mode='overlay' />
					</div>
				</div>
			)}
		</ProfileOverlayContext.Provider>
	);
};
