import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			role='list'
			data-slot='item-group'
			className={cn('mint-:group/item-group mint-:flex mint-:flex-col', className)}
			{...props}
		/>
	);
}

function ItemSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot='item-separator'
			orientation='horizontal'
			className={cn('mint-:my-0', className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	'mint-:group/item mint-:flex mint-:items-center mint-:border mint-:border-transparent mint-:text-sm mint-:rounded-md mint-:transition-colors mint-:[a]:hover:bg-accent/50 mint-:[a]:transition-colors mint-:duration-100 mint-:flex-wrap mint-:outline-none mint-:focus-visible:border-ring mint-:focus-visible:ring-ring/50 mint-:focus-visible:ring-[0.2rem]',
	{
		variants: {
			variant: {
				default: 'mint-:bg-transparent',
				outline: 'mint-:border-border',
				muted: 'mint-:bg-muted/50',
			},
			size: {
				default: 'mint-:p-4 mint-:gap-4 mint-:',
				sm: 'mint-:py-3 mint-:px-4 mint-:gap-2.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Item({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'div'> &
	VariantProps<typeof itemVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'div';
	return (
		<Comp
			data-slot='item'
			data-variant={variant}
			data-size={size}
			className={cn(itemVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

const itemMediaVariants = cva(
	'mint-:flex mint-:shrink-0 mint-:items-center mint-:justify-center mint-:gap-2 mint-:group-has-[[data-slot=item-description]]/item:self-start mint-:[&_svg]:pointer-events-none mint-:group-has-[[data-slot=item-description]]/item:translate-y-0.5',
	{
		variants: {
			variant: {
				default: 'mint-:bg-transparent',
				icon: 'mint-:size-8 mint-:border mint-:rounded-sm mint-:bg-muted mint-:[&_svg:not([class*=size-])]:size-4',
				image:
					'mint-:size-10 mint-:rounded-sm mint-:overflow-hidden mint-:[&_img]:size-full mint-:[&_img]:object-cover',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function ItemMedia({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
	return (
		<div
			data-slot='item-media'
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='item-content'
			className={cn(
				'mint-:flex mint-:flex-1 mint-:flex-col mint-:gap-1 mint-:[&+[data-slot=item-content]]:flex-none',
				className
			)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='item-title'
			className={cn(
				'mint-:flex mint-:w-fit mint-:items-center mint-:gap-2 mint-:text-sm mint-:leading-snug mint-:font-medium',
				className
			)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			data-slot='item-description'
			className={cn(
				'mint-:text-muted-foreground mint-:line-clamp-2 mint-:text-sm mint-:leading-normal mint-:font-normal mint-:text-balance',
				'mint-:[&>a:hover]:text-primary mint-:[&>a]:underline mint-:[&>a]:underline-offset-4',
				className
			)}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='item-actions'
			className={cn('mint-:flex mint-:items-center mint-:gap-2', className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='item-header'
			className={cn(
				'mint-:flex mint-:basis-full mint-:items-center mint-:justify-between mint-:gap-2',
				className
			)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='item-footer'
			className={cn(
				'mint-:flex mint-:basis-full mint-:items-center mint-:justify-between mint-:gap-2',
				className
			)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
};
