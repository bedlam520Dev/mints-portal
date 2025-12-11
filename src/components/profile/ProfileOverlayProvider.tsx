'use client';

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

import { ProfileContent } from './ProfileContent';

type ProfileView = 'profile';

type ProfileOverlayContextValue = {
	openProfile: (view: ProfileView) => void;
	closeProfile: () => void;
};

const ProfileOverlayContext = createContext<ProfileOverlayContextValue | null>(
	null
);

export const useProfileOverlay = (): ProfileOverlayContextValue => {
	const ctx = useContext(ProfileOverlayContext);
	if (!ctx) {
		throw new Error(
			'useProfileOverlay must be used within ProfileOverlayProvider'
		);
	}
	return ctx;
};

type ProfileOverlayProviderProps = {
	children: ReactNode;
};

export const ProfileOverlayProvider = ({
	children,
}: ProfileOverlayProviderProps) => {
	const [activeView, setActiveView] = useState<ProfileView | null>(null);

	const openProfile = useCallback((view: ProfileView) => {
		setActiveView(view);
	}, []);

	const closeProfile = useCallback(() => {
		setActiveView(null);
	}, []);

	return (
		<ProfileOverlayContext.Provider value={{ openProfile, closeProfile }}>
			{children}
			{activeView && (
				<div className='fixed inset-0 z-40 flex items-center justify-center mint-bg-overlay backdrop-blur-md'>
					<div className='mint-overlay__panel max-h-[90vh] w-[min(960px,100%-2rem)] overflow-y-auto'>
						<button
							type='button'
							aria-label='Close Profile information'
							onClick={closeProfile}
							className='mint-overlay__close'
						>
							×
						</button>
						{activeView === 'profile' && (
							<ProfileContent mode='overlay' />
						)}
					</div>
				</div>
			)}
		</ProfileOverlayContext.Provider>
	);
};
