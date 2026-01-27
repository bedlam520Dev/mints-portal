export async function initEruda(): Promise<void> {
	if (typeof window === 'undefined') return;

	if ((window as unknown as { __ERUDA__?: boolean }).__ERUDA__) return;
	(window as unknown as { __ERUDA__?: boolean }).__ERUDA__ = true;

	const eruda = await import('eruda');
	eruda.default.init();
}
