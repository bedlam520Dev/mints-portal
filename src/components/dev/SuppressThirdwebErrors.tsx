'use client';

import { useEffect } from 'react';
export function SuppressThirdwebErrors() {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const originalError = console.error;

		console.error = (...args: unknown[]) => {
			const errorString = args.join(' ');

			if (
				errorString.includes('cannot be a descendant of') &&
				errorString.includes('<button>') &&
				errorString.includes('CopyIcon')
			) {
				if (process.env.NODE_ENV === 'development') {
					console.warn('[Suppressed] Known Thirdweb SDK nested button issue detected');
				}
				return;
			}

			originalError.apply(console, args);
		};

		return () => {
			console.error = originalError;
		};
	}, []);

	return null;
}
