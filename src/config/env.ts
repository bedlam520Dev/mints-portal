const truthy = new Set(['1', 'true', 'yes', 'on']);

const parseBoolean = (value: string | undefined, fallback = false) => {
	if (typeof value !== 'string') return fallback;
	return truthy.has(value.trim().toLowerCase());
};

const mockFlag = parseBoolean(process.env.NEXT_PUBLIC_USE_MOCK_DATA);

export const env = {
	/**
	 * When true, server/client data fetching utilities will use mock data instead of hitting RPCs.
	 * Defaults to `false` unless explicitly enabled via NEXT_PUBLIC_USE_MOCK_DATA.
	 */
	useMockData: mockFlag,
};

export const isMockDataEnabled = env.useMockData;
