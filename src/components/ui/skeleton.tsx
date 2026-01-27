import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='skeleton'
			className={cn('mint-:bg-accent mint-:animate-pulse mint-:rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
