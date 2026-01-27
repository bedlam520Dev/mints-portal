import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='empty'
			className={cn(
				'mint-:flex mint-:min-w-0 mint-:flex-1 mint-:flex-col mint-:items-center mint-:justify-center mint-:gap-6 mint-:rounded-lg mint-:border-dashed mint-:p-6 mint-:text-center mint-:text-balance mint-:md:p-12',
				className
			)}
			{...props}
		/>
	);
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='empty-header'
			className={cn(
				'mint-:flex mint-:max-w-sm mint-:flex-col mint-:items-center mint-:gap-2 mint-:text-center',
				className
			)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	'mint-:flex mint-:shrink-0 mint-:items-center mint-:justify-center mint-:mb-2 mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'mint-:bg-transparent',
				icon: 'mint-:bg-muted mint-:text-foreground mint-:flex mint-:size-10 mint-:shrink-0 mint-:items-center mint-:justify-center mint-:rounded-lg mint-:[&_svg:not([class*=size-])]:size-6',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function EmptyMedia({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot='empty-icon'
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='empty-title'
			className={cn('mint-:text-lg mint-:font-medium mint-:tracking-tight', className)}
			{...props}
		/>
	);
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<div
			data-slot='empty-description'
			className={cn(
				'mint-:text-muted-foreground mint-:[&>a:hover]:text-primary mint-:text-sm/relaxed mint-:[&>a]:underline mint-:[&>a]:underline-offset-4',
				className
			)}
			{...props}
		/>
	);
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='empty-content'
			className={cn(
				'mint-:flex mint-:w-full mint-:max-w-sm mint-:min-w-0 mint-:flex-col mint-:items-center mint-:gap-4 mint-:text-sm mint-:text-balance',
				className
			)}
			{...props}
		/>
	);
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
