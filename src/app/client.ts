import { createThirdwebClient } from 'thirdweb';

const publicClientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!publicClientId) {
	throw new Error('Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID (set this in your env).');
}

export const client = createThirdwebClient({
	clientId: publicClientId,
});

const getServerSecretKey = (): string => {
	if (typeof window !== 'undefined') {
		throw new Error('getServerSecretKey must not be called in a browser context.');
	}

	const secretKey = process.env.NEXT_THIRDWEB_SECRET_KEY;

	if (!secretKey) {
		throw new Error(
			'Missing NEXT_THIRDWEB_SECRET_KEY for server-side thirdweb client.'
		);
	}

	return secretKey;
};
export const getServerThirdwebClient = () => {
	const secretKey = getServerSecretKey();

	return createThirdwebClient({
		secretKey,
	});
};
export const getThirdwebProjectConfig = () => ({
	projectId: process.env.NEXT_THIRDWEB_PROJECT_ID ?? null,
	projectWalletAddress: process.env.NEXT_THIRDWEB_PROJECT_WALLET_ADDRESS ?? null,
});
