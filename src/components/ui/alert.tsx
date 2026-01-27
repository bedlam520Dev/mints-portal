import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const alertVariants = cva(
	'mint-:relative mint-:w-full mint-:rounded-lg mint-:border mint-:px-4 mint-:py-3 mint-:text-sm mint-:grid mint-:has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] mint-:grid-cols-[0_1fr] mint-:has-[>svg]:gap-x-3 mint-:gap-y-0.5 mint-:items-start mint-:[&>svg]:size-4 mint-:[&>svg]:translate-y-0.5 mint-:[&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'mint-:bg-card mint-:text-card-foreground',
				destructive:
					'mint-:text-destructive mint-:bg-card mint-:[&>svg]:text-current mint-:*:data-[slot=alert-description]:text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-title'
			className={cn(
				'mint-:col-start-2 mint-:line-clamp-1 mint-:min-h-4 mint-:font-medium mint-:tracking-tight',
				className
			)}
			{...props}
		/>
	);
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-description'
			className={cn(
				'mint-:text-muted-foreground mint-:col-start-2 mint-:grid mint-:justify-items-start mint-:gap-1 mint-:text-sm mint-:[&_p]:leading-relaxed',
				className
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription };
