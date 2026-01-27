import { LogoLinkButton } from '@/components/mints/LogoLinkButton';
import Image from 'next/image';

import { LOGO_LINKS, heroBanner } from './constants';

export const HeroSection = () => (
	<section className='hero-section'>
		<div className='mint-hero-wrapper'>
			<div className='mint-hero'>
				<Image
					src={heroBanner}
					alt='BEDLAM520nft Banner'
					width={825}
					height={330}
					priority
					className='mint-hero-banner'
				/>
				<div className='logo-links-grid-wrapper'>
					<div className='logo-links-grid'>
						{LOGO_LINKS.map((logo) => (
							<LogoLinkButton
								key={logo.id}
								href={logo.href}
								iconSrc={logo.iconSrc}
								iconAlt={logo.iconAlt}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	</section>
);
