'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='mint-background flex min-h-screen items-center justify-center overflow-hidden p-4'>
			<div className='mint-shell mx-auto max-w-2xl space-y-8 text-center'>
				<div className='relative'>
					<h1 className='glitch-text text-9xl font-black text-transparent select-none md:text-[12rem]'>
						404
					</h1>
					<h1 className='glitch-text-shadow mint-gradient-text absolute inset-0 text-9xl font-black select-none md:text-[12rem]'>
						404
					</h1>
					<h1
						className='glitch-text-shadow-2 absolute inset-0 text-9xl font-black select-none md:text-[12rem]'
						style={{ color: 'var(--mint-amaranthine)' }}
					>
						404
					</h1>
				</div>

				<div className='space-y-4'>
					<p className='glitch-message mint-muted-text text-xl font-extralight md:text-2xl'>
						This page fell into the void.
					</p>
					<p className='glitch-subtitle destructive-text text-sm font-extralight md:text-base'>
						{'// ERROR: Reality.exe has stopped working'}
					</p>
				</div>

				<div className='pt-4'>
					<Link
						href='/'
						className='profile-badge mint-aegean-glow-sm inline-flex items-center gap-2'
					>
						<Home className='h-4 w-4 transition-transform group-hover:scale-110' />
						Go Home
					</Link>
				</div>

				<div className='pointer-events-none absolute inset-0'>
					<div
						className='glitch-line glitch-line-1'
						style={{
							background:
								'linear-gradient(90deg, transparent, var(--mint-aegean), transparent)',
						}}
					></div>
					<div
						className='glitch-line glitch-line-2'
						style={{
							background:
								'linear-gradient(90deg, transparent, var(--mint-magenta), transparent)',
						}}
					></div>
				</div>
			</div>
		</div>
	);
}
