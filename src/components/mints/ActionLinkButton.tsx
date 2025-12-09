import type { ReactNode } from 'react';

export type ActionLinkButtonProps = {
	label: string;
	href: string;
	icon?: ReactNode;
};

export const ActionLinkButton = ({
	label,
	href,
	icon,
}: ActionLinkButtonProps) => (
	<a
		href={href}
		target='_blank'
		rel='noreferrer'
		className='action-chip mint-purple-glow-sm md:mint-purple-glow lg:mint-purple-glow xl:mint-purple-glow'
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
