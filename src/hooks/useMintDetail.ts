import type { MintSummary } from '@/types/mint';
import { useEffect, useState } from 'react';

export const useMintDetail = (contractSlug: string | null, tokenId: string | null) => {
	const [mint, setMint] = useState<MintSummary | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!tokenId || !contractSlug) {
			// Clear mint when params are invalid
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMint(null);
			return;
		}

		const controller = new AbortController();
		setIsLoading(true);
		fetch(`/api/mints/${contractSlug}/${tokenId}`, {
			signal: controller.signal,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Unable to load mint ${tokenId}`);
				}
				return response.json() as Promise<{ mint: MintSummary }>;
			})
			.then((payload) => {
				setMint(payload.mint);
				setError(null);
			})
			.catch((err: Error) => {
				if (err.name === 'AbortError') return;
				setError(err);
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, [contractSlug, tokenId]);

	return { mint, isLoading, error };
};
