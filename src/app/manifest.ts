import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'BEDLAM520nft Mints Portal',
		short_name: 'BEDLAM520nfts',
		description: 'The Official Minting Portal for BEDLAM520nft.',
		start_url: '/',
		display: 'standalone',
		background_color: '#050505cc',
		theme_color: '#7f39c6e6',
		icons: [
			{ src: '/16x16.png', sizes: '16x16', type: 'image/png' },
			{ src: '/32x32.png', sizes: '32x32', type: 'image/png' },
			{ src: '/64x64.png', sizes: '64x64', type: 'image/png' },
			{ src: '/180x180.png', sizes: '180x180', type: 'image/png' },
			{ src: '/192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/200x200.png', sizes: '200x200', type: 'image/png' },
			{ src: '/512x512.png', sizes: '512x512', type: 'image/png' },
			{ src: '/825x330.png', sizes: '825x330', type: 'image/png' },
			{ src: '/1024x1024.png', sizes: '1024x1024', type: 'image/png' },
			{ src: '/1050x700.png', sizes: '1050x700', type: 'image/png' },
			{ src: '/1200x630.png', sizes: '1200x630', type: 'image/png' },
		],
	};
}
