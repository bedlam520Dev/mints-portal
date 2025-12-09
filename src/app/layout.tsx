import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThirdwebProvider } from 'thirdweb/react';

import { LegalOverlayProvider } from '@/components/legal/LegalOverlayProvider';
import { siteConfig } from '@/config/site';

import './globals.css';

const inter = localFont({
	src: './fonts/Inter-Variable.ttf',
	variable: '--font-inter',
	weight: '100 900',
	display: 'swap',
});

const martian = localFont({
	src: './fonts/MartianMono-Variable.ttf',
	variable: '--font-martian',
	weight: '100 900',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	manifest: '/manifest.webmanifest',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} ${martian.variable}`}>
				<ThirdwebProvider>
					<LegalOverlayProvider>{children}</LegalOverlayProvider>
				</ThirdwebProvider>
			</body>
		</html>
	);
}
