import { ErudaInit } from '@/components/dev/ErudaInit';
import { SuppressThirdwebErrors } from '@/components/dev/SuppressThirdwebErrors';
import { LegalOverlayProvider } from '@/components/legal/LegalOverlayProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SkipLink } from '@/components/ui/SkipLink';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThirdwebProvider } from 'thirdweb/react';

import { StructuredData } from './StructuredData';

import './globals.css';

const martianVar = localFont({
	src: './fonts/MartianVar.ttf',
	variable: '--font-em-grot',
	weight: '100 900',
	display: 'swap',
});

const martianMonoVar = localFont({
	src: './fonts/MartianMonoVar.ttf',
	variable: '--font-em-mono',
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
	keywords: [
		'NFT',
		'mint',
		'Base',
		'BEDLAM520nft',
		'blockchain',
		'digital art',
		'crypto',
		'Web3',
		'Thirdweb',
		'ERC-721',
		'ERC-1155',
	],
	authors: [{ name: 'BEDLAM520 Development' }],
	creator: 'BEDLAM520 Development',
	publisher: 'BEDLAM520 Development',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.assets.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.assets.ogImage],
		creator: siteConfig.social.twitterHandle,
		site: siteConfig.social.twitterHandle,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className='dark'
			suppressHydrationWarning
		>
			<head>
				<StructuredData />
			</head>
			<body className={`${martianVar.variable} ${martianMonoVar.variable}`}>
				<SkipLink />
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ThirdwebProvider>
						<ErrorBoundary>
							<LegalOverlayProvider>{children}</LegalOverlayProvider>
						</ErrorBoundary>
						<SuppressThirdwebErrors />
						<ErudaInit />
						<Toaster />
					</ThirdwebProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
