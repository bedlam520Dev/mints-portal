import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Image from 'next/image';

export const logos = [
	{
		name: 'Next.js',
		light: '/icons/nextjs-light.png',
		dark: '/icons/nextjs-dark.png',
		width: 512,
		link: 'https://nextjs.org',
		className: 'ml-6 mr-1',
	},
	{
		name: 'TypeScript',
		light: '/icons/typescript.png',
		dark: '/icons/typescript.png',
		width: 256,
		link: 'https://typescriptlang.org',
		className: 'ml-1 mr-1',
	},
	{
		name: 'PNPM',
		light: '/icons/pnpm-light.png',
		dark: '/icons/pnpm-dark.png',
		width: 512,
		link: 'https://pnpm.io',
		className: 'ml-1 mr-1',
	},
	{
		name: 'dotenvx',
		light: '/icons/dotenvx.png',
		dark: '/icons/dotenvx.png',
		width: 256,
		link: 'https://dotenvx.com/',
		className: 'ml-1 mr-1',
	},
	{
		name: 'TailwindCSS',
		light: '/icons/tailwindcss-light.png',
		dark: '/icons/tailwindcss-dark.png',
		width: 512,
		link: 'https://tailwindcss.com',
		className: 'ml-1 mr-1',
	},
	{
		name: 'OXC',
		light: '/icons/oxc.png',
		dark: '/icons/oxc.png',
		width: 256,
		link: 'https://oxc.dev',
		className: 'ml-1 mr-1',
	},
	{
		name: 'PostCSS',
		light: '/icons/postcss-light.png',
		dark: '/icons/postcss-dark.png',
		width: 512,
		link: 'https://postcss.org',
		className: 'ml-1 mr-1',
	},
	{
		name: 'Node.js',
		light: '/icons/nodejs.png',
		dark: '/icons/nodejs.png',
		width: 256,
		link: 'https://nodejs.org/',
		className: 'ml-1 mr-1',
	},
	{
		name: 'React',
		light: '/icons/react-light.png',
		dark: '/icons/react-dark.png',
		width: 512,
		link: 'https://react.dev',
		className: 'ml-1 mr-1',
	},
	{
		name: 'shadcn/ui',
		light: '/icons/shadcnui-light.png',
		dark: '/icons/shadcnui-dark.png',
		width: 256,
		link: 'https://ui.shadcn.com',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-1',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Gemini',
		light: '/icons/gemini-wordmark.png',
		dark: '/icons/gemini-wordmark.png',
		width: 512,
		link: 'https://gemini.com',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Claude',
		light: '/icons/claude-light.png',
		dark: '/icons/claude-dark.png',
		width: 512,
		link: 'https://claude.ai',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-2',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Evil Martians',
		light: '/icons/evilMartians.png',
		dark: '/icons/evilMartians.png',
		width: 256,
		link: 'https://evilmartians.com',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Evil Icons',
		light: '/icons/evilIcons.png',
		dark: '/icons/evilIcons.png',
		width: 256,
		link: 'https://evilmartians.com/opensource/evil-icons',
		className: 'ml-1 mr-1',
	},
	{
		name: 'OKLCH',
		light: '/icons/oklch.png',
		dark: '/icons/oklch.png',
		width: 256,
		link: 'https://oklch.com',
		className: 'ml-1 mr-1',
	},
	{
		name: 'Martian Grotesk',
		light: '/icons/martianGrotesk.png',
		dark: '/icons/martianGrotesk.png',
		width: 256,
		link: 'https://evilmartians.com/products/martian-grotesk',
		className: 'ml-1 mr-1',
	},
	{
		name: 'Martian Mono',
		light: '/icons/martianMono.png',
		dark: '/icons/martianMono.png',
		width: 256,
		link: 'https://evilmartians.com/products/martian-mono',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-3',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Jest',
		light: '/icons/jest.png',
		dark: '/icons/jest.png',
		width: 256,
		link: 'https://jestjs.io',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Playwright',
		light: '/icons/playwright.png',
		dark: '/icons/playwright.png',
		width: 256,
		link: 'https://playwright.dev',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-4',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Motion',
		light: '/icons/motion-wm-light.png',
		dark: '/icons/motion-wm-dark.png',
		width: 512,
		link: 'https://motion.dev',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Motion Primitives',
		light: '/icons/motion-primitives-light.png',
		dark: '/icons/motion-primitives-dark.png',
		width: 256,
		link: 'https://motion.primitives.sh',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-5',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Vercel',
		light: '/icons/vercel-light.png',
		dark: '/icons/vercel-dark.png',
		width: 512,
		link: 'https://vercel.com',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Turbopack',
		light: '/icons/turbopack-wm-light.png',
		dark: '/icons/turbopack-wm-dark.png',
		width: 512,
		link: 'https://turbopack.dev',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-6',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'VS Code',
		light: '/icons/vscode.png',
		dark: '/icons/vscode.png',
		width: 256,
		link: 'https://code.visualstudio.com',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Google Antigravity',
		light: '/icons/antigravity-wm-light.png',
		dark: '/icons/antigravity-wm-dark.png',
		width: 512,
		link: 'https://antigravity.google/',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-7',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'SVGL',
		light: '/icons/svgl.png',
		dark: '/icons/svgl.png',
		width: 256,
		link: 'https://svgl.io',
		className: 'ml-6 mr-1',
	},
	{
		name: 'Compressor',
		light: '/icons/compressor.png',
		dark: '/icons/compressor.png',
		width: 512,
		link: 'https://compressor.io',
		className: 'ml-1 mr-6',
	},
	{
		name: 'Separator-8',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
	{
		name: 'Sentry',
		light: '/icons/sentry.png',
		dark: '/icons/sentry.png',
		width: 256,
		link: 'https://sentry.io',
		className: 'ml-6 mr-6',
	},
	{
		name: 'Separator-9',
		light: '/icons/separator-light.png',
		dark: '/icons/separator-dark.png',
		width: 256,
		className: 'ml-3 mr-3',
	},
];

export function InfiniteSliderHoverSpeed() {
	return (
		<section className='relative mx-auto mt-4 mb-2 flex w-full flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center'>
			<div className='mb-6 flex flex-col items-center justify-center gap-3'>
				<h2 className='mint-gradient-text mb-0 text-[2.5rem] font-bold tracking-wide'>
					Proudly Built With
				</h2>
				<p className='mint-gradient-text mb-2 text-[clamp(0.95rem,1.8vw,1.15rem)] font-bold tracking-wide'>
					Some of the brands, apps, packages, and libraries we are proud to be built
					upon.
				</p>
			</div>
			<InfiniteSlider
				speed={150}
				speedOnHover={50}
				gap={80}
				className='py-16'
			>
				{logos.map((logo) => (
					<div
						key={logo.name}
						className={`group relative flex items-center justify-center ${logo.className || ''}`}
					>
						{!logo.name.includes('Separator') && (
							<div className='bg-card text-card-foreground absolute -top-16 left-1/2 z-50 rounded-xl border px-4 py-2 text-sm font-semibold whitespace-nowrap opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100'>
								{logo.name}
								<div className='border-r-border border-b-border bg-card absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b' />
							</div>
						)}
						{logo.link ? (
							<a
								href={logo.link}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center'
							>
								<Image
									src={logo.light}
									alt={`${logo.name}`}
									height={256}
									width={logo.width || 512}
									loading='eager'
									className={`h-28 w-auto ${logo.dark ? 'dark:hidden' : ''}`}
								/>
								{logo.dark && (
									<Image
										src={logo.dark}
										alt={`${logo.name}`}
										height={256}
										width={logo.width || 512}
										loading='eager'
										className='hidden h-28 w-auto dark:block'
									/>
								)}
							</a>
						) : (
							<>
								<Image
									src={logo.light}
									alt={`${logo.name}`}
									height={256}
									width={logo.width || 512}
									loading='eager'
									className={`h-28 w-auto ${logo.dark ? 'dark:hidden' : ''}`}
								/>
								{logo.dark && (
									<Image
										src={logo.dark}
										alt={`${logo.name}`}
										height={256}
										width={logo.width || 512}
										loading='eager'
										className='hidden h-28 w-auto dark:block'
									/>
								)}
							</>
						)}
					</div>
				))}
			</InfiniteSlider>
		</section>
	);
}
