import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundImage: 'var(--mint-og-gradient)',
				color: 'var(--mint-text)',
				fontFamily: 'sans-serif',
				textAlign: 'center',
				padding: '80px',
			}}
		>
			<div
				style={{
					fontSize: 24,
					letterSpacing: '0.4em',
					textTransform: 'uppercase',
				}}
			>
				Base · Superchain
			</div>
			<h1 style={{ fontSize: 80, margin: '20px 0 10px' }}>
				{siteConfig.name}
			</h1>
			<p style={{ fontSize: 32, maxWidth: 900 }}>
				{siteConfig.description}
			</p>
		</div>,
		{
			...size,
		}
	);
}
