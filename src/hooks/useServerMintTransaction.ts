'use client';

import { useCallback, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

type BuyArgs = {
	contractSlug: string;
	tokenId: string;
	quantity: number;
};

type UseServerMintTransactionResult = {
	buy: (args: BuyArgs) => Promise<void>;
	isPending: boolean;
	error: Error | null;
	resetError: () => void;
};

export const useServerMintTransaction = (): UseServerMintTransactionResult => {
	const account = useActiveAccount();
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const resetError = useCallback(() => setError(null), []);

	const buy = useCallback(
		async ({ contractSlug, tokenId, quantity }: BuyArgs) => {
			resetError();

			if (!account?.address) {
				throw new Error('Wallet not connected.');
			}

			setIsPending(true);

			try {
				const response = await fetch('/api/mints', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						contractSlug,
						tokenId,
						quantity,
						toAddress: account.address,
					}),
				});

				const data = (await response.json()) as {
					ok?: boolean;
					error?: string;
					transactionHash?: string;
				};

				if (!response.ok || !data.ok) {
					throw new Error(data.error || 'Mint transaction failed.');
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : 'Mint transaction failed.';
				const wrapped = new Error(message);
				setError(wrapped);
				throw wrapped;
			} finally {
				setIsPending(false);
			}
		},
		[account?.address, resetError]
	);

	return {
		buy,
		isPending,
		error,
		resetError,
	};
};
