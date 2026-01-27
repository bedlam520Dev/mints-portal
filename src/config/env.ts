const truthy = new Set(['1', 'true', 'yes', 'on']);

const parseBoolean = (value: string | undefined, fallback = false) => {
	if (typeof value !== 'string') return fallback;
	return truthy.has(value.trim().toLowerCase());
};

const mockFlag = parseBoolean(process.env.NEXT_PUBLIC_USE_MOCK_DATA);
const aaFlag = parseBoolean(process.env.NEXT_PUBLIC_ENABLE_ACCOUNT_ABSTRACTION);

export const env = {
	useMockData: mockFlag,
	enableAccountAbstraction: aaFlag,
};

export const isMockDataEnabled = env.useMockData;
export const isAccountAbstractionEnabled = env.enableAccountAbstraction;
