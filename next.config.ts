/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: false,
	allowedDevOrigins: [
		'http://localhost:3000',
		'http://localhost:3001',
		'https://thirdweb.com',
		'https://thirdweb-dev.com',
		'https://thirdweb-beta.com',
		'https://temperature-blacks-southwest-periodically.trycloudflare.com',
		'https://mints-portal.vercel.app',
	],
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production' ?
				{
					exclude: ['error', 'warn'],
				}
			:	false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'mints-portal.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'ipfs.thirdwebcdn.com',
			},
			{
				protocol: 'https',
				hostname: '**.ipfscdn.io',
			},
		],
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 60,
	},
	devIndicators: false,
	output: process.env.BUILD_STANDALONE ? 'standalone' : undefined,
	experimental: {
		optimizePackageImports: [
			'lucide-react',
			'@radix-ui/react-dialog',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-tooltip',
			'thirdweb',
			'viem',
		],
	},
	// Empty turbopack config to silence webpack warning in Next.js 16
	turbopack: {},
	headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: 'frame-ancestors *',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
				],
			},
		];
	},
};

export default nextConfig;
