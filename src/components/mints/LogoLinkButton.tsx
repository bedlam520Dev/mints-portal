import Image from 'next/image';
import Link from 'next/link';
export type LogoLinkButtonProps = {
	href: string;
	iconSrc: string;
	iconAlt: string;
};

export const LogoLinkButton = ({ href, iconSrc, iconAlt }: LogoLinkButtonProps) => (
	<Link
		href={href}
		target='_blank'
		rel='noreferrer'
		className='logo-link-button'
		aria-label={iconAlt}
	>
		<Image
			src={iconSrc}
			alt={iconAlt}
			width={256}
			height={256}
			priority
			className='logo-link-button-icon'
		/>
	</Link>
);
