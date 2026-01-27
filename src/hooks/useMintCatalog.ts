import type { MintSummary } from '@/types/mint';
import { useCallback, useEffect, useState } from 'react';

type LoadOptions = {
	silent?: boolean;
	signal?: AbortSignal;
};

const INITIAL_STATE: MintSummary[] = [];

export const useMintCatalog = (contractSlug?: string) => {
	const [mints, setMints] = useState<MintSummary[]>(INITIAL_STATE);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const loadMints = useCallback(
		async ({ silent = false, signal }: LoadOptions = {}) => {
			if (!silent) {
				setIsLoading(true);
			}

			try {
				const query = contractSlug ? `?contract=${contractSlug}` : '';
				const response = await fetch(`/api/mints${query}`, { signal });
				if (!response.ok) {
					throw new Error(`Failed to load mints (${response.status})`);
				}
				const payload = (await response.json()) as {
					mints?: MintSummary[];
				};
				setMints(payload.mints ?? INITIAL_STATE);
				setError(null);
			} catch (err) {
				if ((err as Error).name === 'AbortError') {
					return;
				}
				setError(err as Error);
			} finally {
				if (!silent) {
					setIsLoading(false);
				}
			}
		},
		[contractSlug]
	);

	useEffect(() => {
		const controller = new AbortController();
		loadMints({ signal: controller.signal }).catch(() => undefined);
		const interval = setInterval(() => {
			loadMints({ silent: true }).catch(() => undefined);
		}, 300_000);

		return () => {
			controller.abort();
			clearInterval(interval);
		};
	}, [loadMints]);

	const refetch = useCallback(async () => {
		await loadMints();
	}, [loadMints]);

	return { mints, isLoading, error, refetch };
};
