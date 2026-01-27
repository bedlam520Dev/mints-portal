'use client';

import { initEruda } from '@/lib/eruda';
import { useEffect } from 'react';

function isEnabled(): boolean {
	if (typeof window === 'undefined') return false;

	const envEnabled = process.env.NEXT_PUBLIC_ERUDA === '1';
	const urlEnabled = new URLSearchParams(window.location.search).get('eruda');
	const queryEnabled = urlEnabled === '1' || urlEnabled === 'true';

	return process.env.NODE_ENV !== 'production' && (envEnabled || queryEnabled);
}

export function ErudaInit(): null {
	useEffect(() => {
		if (!isEnabled()) return;
		void initEruda();
	}, []);

	return null;
}
