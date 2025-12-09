export const formatDateTime = (timestamp: number | null) => {
	if (!timestamp) return 'Anytime';
	return new Date(timestamp * 1000).toLocaleString();
};
