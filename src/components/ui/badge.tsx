import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
	'mint-:inline-flex mint-:items-center mint-:justify-center mint-:rounded-full mint-:border mint-:px-2 mint-:py-0.5 mint-:text-xs mint-:font-medium mint-:w-fit mint-:whitespace-nowrap mint-:shrink-0 mint-:[&>svg]:size-3 mint-:gap-1 mint-:[&>svg]:pointer-events-none mint-:focus-visible:border-ring mint-:focus-visible:ring-ring/50 mint-:focus-visible:ring-[0.2rem] mint-:aria-invalid:ring-destructive/20 mint-:dark:aria-invalid:ring-destructive/40 mint-:aria-invalid:border-destructive mint-:transition-[color,box-shadow] mint-:overflow-hidden',
	{
		variants: {
			variant: {
				default:
					'mint-:border-transparent mint-:bg-primary mint-:text-primary-foreground mint-:[a&]:hover:bg-primary/90',
				secondary:
					'mint-:border-transparent mint-:bg-secondary mint-:text-secondary-foreground mint-:[a&]:hover:bg-secondary/90',
				destructive:
					'mint-:border-transparent mint-:bg-destructive mint-:text-white mint-:[a&]:hover:bg-destructive/90 mint-:focus-visible:ring-destructive/20 mint-:dark:focus-visible:ring-destructive/40 mint-:dark:bg-destructive/60',
				outline:
					'mint-:text-foreground mint-:[a&]:hover:bg-accent mint-:[a&]:hover:text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot='badge'
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
