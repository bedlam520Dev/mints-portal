'use client';

import { useLegalOverlay } from '@/components/legal/LegalOverlayProvider';
import Link from 'next/link';

export const MintFooter = () => {
	const { openLegal } = useLegalOverlay();
	return (
		<section className='footer-section'>
			<div className='footer-column-l'></div>
			<div className='footer-column'>
				<footer className='mint-footer'>
					<div className='footer-content__col'>
						<p className='footer-text footer-text--static whitespace-nowrap'>
							© {new Date().getFullYear()}{' '}
							<Link
								href='https://github.com/bedlam520Dev'
								className='footer-text footer-text--link footer-text--link:hover'
								target='_blank'
								rel='noopener noreferrer'
							>
								BEDLAM520 Development
							</Link>
						</p>
					</div>
					<div className='footer-content__row'>
						<Link
							href='/terms'
							className='footer-content__col footer-text footer-text--link footer-text--link:hover'
							onClick={(e) => {
								e.preventDefault();
								openLegal('terms');
							}}
						>
							Terms of Service
						</Link>
						<span className='footer-content__col footer-text footer-text--static'>
							•
						</span>
						<Link
							href='/privacy'
							className='footer-content__col footer-text footer-text--link footer-text--link:hover'
							onClick={(e) => {
								e.preventDefault();
								openLegal('privacy');
							}}
						>
							Privacy Policy
						</Link>
						<span className='footer-content__col footer-text footer-text--static'>
							•
						</span>
						<Link
							href='/data-policy'
							className='footer-content__col footer-text footer-text--link footer-text--link:hover'
							onClick={(e) => {
								e.preventDefault();
								openLegal('data');
							}}
						>
							Data Handling
						</Link>
					</div>
				</footer>
			</div>
			<div className='footer-column-r'></div>
		</section>
	);
};
