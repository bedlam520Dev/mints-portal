import { getContractConfig } from '@/config/contracts';
import { buildContractInstance } from '@/lib/contracts';
import { useMintActivity } from '@/lib/mints/activity';
import { useCallback, useState } from 'react';
import { claimTo as claimErc721 } from 'thirdweb/extensions/erc721';
import { claimTo as claimErc1155 } from 'thirdweb/extensions/erc1155';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';

type MintArgs = {
	tokenId: string;
	contractSlug: string;
	quantity?: number;
};

export const useMintTransaction = () => {
	const account = useActiveAccount();
	const sendTransaction = useSendTransaction({});
	const [error, setError] = useState<Error | null>(null);
	const { add, updateStatus } = useMintActivity();

	const buy = useCallback(
		async ({ tokenId, contractSlug, quantity = 1 }: MintArgs) => {
			setError(null);

			if (!account) {
				throw new Error('Connect a wallet to mint.');
			}

			const walletAddress = account.address;
			const numericQuantity = Number.isFinite(quantity) ? quantity : 1;
			const quantityBigInt = BigInt(numericQuantity);

			// Create a pending activity entry before sending the transaction
			const activityId = add({
				walletAddress,
				contractSlug,
				tokenId,
				quantity: numericQuantity,
				status: 'pending',
			});

			try {
				const config = getContractConfig(contractSlug);
				const contract = buildContractInstance(config);

				const transaction =
					config.standard === 'erc721'
						? claimErc721({
								contract,
								to: walletAddress,
								quantity: quantityBigInt,
							})
						: claimErc1155({
								contract,
								to: walletAddress,
								tokenId: BigInt(tokenId),
								quantity: quantityBigInt,
							});

				const result = await sendTransaction.mutateAsync(transaction);

				let txHash: string | undefined;
				if (result && typeof result === 'object' && 'transactionHash' in result) {
					const maybeHash = (result as { transactionHash?: unknown }).transactionHash;
					if (typeof maybeHash === 'string') {
						txHash = maybeHash;
					}
				}

				updateStatus(activityId, 'confirmed', txHash);
			} catch (err) {
				updateStatus(activityId, 'failed');
				setError(err as Error);
				throw err;
			}
		},
		[account, add, sendTransaction, updateStatus]
	);

	const resetError = useCallback(() => setError(null), []);

	return {
		buy,
		isPending: sendTransaction.isPending,
		error,
		resetError,
	};
};
