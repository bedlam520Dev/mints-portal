import { useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
	const containerRef = useRef<T>(null);

	useEffect(() => {
		if (!isActive) return;

		const container = containerRef.current;
		if (!container) return;

		// Get all focusable elements
		const focusableElements = container.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		// Focus first element on mount
		firstElement?.focus();

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			// If only one focusable element, prevent default
			if (focusableElements.length === 1) {
				e.preventDefault();
				return;
			}

			// Shift + Tab (backwards)
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement?.focus();
					e.preventDefault();
				}
			} else {
				// Tab (forwards)
				if (document.activeElement === lastElement) {
					firstElement?.focus();
					e.preventDefault();
				}
			}
		};

		container.addEventListener('keydown', handleTabKey);

		return () => {
			container.removeEventListener('keydown', handleTabKey);
		};
	}, [isActive]);

	return containerRef;
}
