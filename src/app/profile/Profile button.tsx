import type { ReactNode } from 'react';

export type ProfileButtonProps = {
	label: string;
	href: string;
	icon?: ReactNode;
};

export const ProfileButton = ({ label, href, icon }: ProfileButtonProps) => (
	<a
		href={href}
		target='_blank'
		rel='noreferrer'
		className='profile-chip mint-purple-glow-sm md:mint-purple-glow lg:mint-purple-glow xl:mint-purple-glow'
	>
		{icon && (
			<span
				aria-hidden='true'
				className='text-md'
			>
				{icon}
			</span>
		)}
		<span>{label}</span>
	</a>
);
