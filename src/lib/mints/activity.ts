import { useCallback, useEffect, useState } from 'react';

export type MintStatus = 'pending' | 'confirmed' | 'failed';

export type MintActivityItem = {
	id: string;
	walletAddress: string;
	contractSlug: string;
	tokenId: string;
	quantity: number;
	status: MintStatus;
	createdAt: number;
	updatedAt: number;
	txHash?: string;
};

const STORAGE_KEY = 'bedlam-mint-activity';

const isBrowser = typeof window !== 'undefined';

const safeParse = (value: string | null): MintActivityItem[] => {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value) as unknown;
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(
			(item) => typeof item === 'object' && item
		) as MintActivityItem[];
	} catch {
		return [];
	}
};

const readFromStorage = (): MintActivityItem[] => {
	if (!isBrowser) return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return safeParse(raw);
	} catch {
		return [];
	}
};

const writeToStorage = (items: MintActivityItem[]) => {
	if (!isBrowser) return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		// ignore storage errors
	}
};

const generateId = (contractSlug: string, tokenId: string): string => {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}
	return `${contractSlug}:${tokenId}:${Date.now()}`;
};

export const useMintActivity = () => {
	const [items, setItems] = useState<MintActivityItem[]>([]);

	useEffect(() => {
		// Initialize state from localStorage on mount
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setItems(readFromStorage());
	}, []);

	const add = useCallback(
		(input: Omit<MintActivityItem, 'id' | 'createdAt' | 'updatedAt'>) => {
			const now = Date.now();
			const id = generateId(input.contractSlug, input.tokenId);
			const nextItem: MintActivityItem = {
				...input,
				id,
				createdAt: now,
				updatedAt: now,
			};

			setItems((prev) => {
				const next = [nextItem, ...prev].slice(0, 50);
				writeToStorage(next);
				return next;
			});

			return id;
		},
		[]
	);

	const updateStatus = useCallback(
		(id: string, status: MintStatus, txHash?: string) => {
			setItems((prev) => {
				const next = prev.map((item) => {
					if (item.id !== id) return item;
					return {
						...item,
						status,
						txHash: txHash ?? item.txHash,
						updatedAt: Date.now(),
					};
				});
				writeToStorage(next);
				return next;
			});
		},
		[]
	);

	const clear = useCallback(() => {
		setItems([]);
		writeToStorage([]);
	}, []);

	return {
		items,
		add,
		updateStatus,
		clear,
	};
};
