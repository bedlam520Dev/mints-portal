import path from 'node:path';

const pinoStubFsPath = path.resolve(process.cwd(), 'src/lib/stubs/pino.ts');
const pinoStubTurboAlias = './src/lib/stubs/pino.ts';

/** @type {import('next').NextConfig} */
const nextConfig = {
	serverExternalPackages: ['pino-pretty'],
	turbopack: {
		resolveAlias: {
			pino: pinoStubTurboAlias,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ipfs.thirdwebcdn.com',
			},
			{
				protocol: 'https',
				hostname: '**.ipfscdn.io',
			},
		],
	},
	devIndicators: {
		buildActivity: false,
	},
	async headers() {
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
				],
			},
		];
	},
	webpack: (config: any) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			pino: pinoStubFsPath,
		};
		return config;
	},
};

export default nextConfig;
