import { siteConfig } from '@/config/site';
import { ImageResponse } from 'next/og';

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
				background:
					'linear-gradient(135deg, rgba(5, 0, 20, 0.1) 0%, rgba(40, 20, 70, 0.25) 50%, rgba(80, 50, 120, 0.8) 100%)',
				color: '#fafafa',
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
			<h1 style={{ fontSize: 80, margin: '20px 0 0.625rem' }}>{siteConfig.name}</h1>
			<p style={{ fontSize: 32, maxWidth: 900 }}>{siteConfig.description}</p>
		</div>,
		{
			...size,
		}
	);
}
