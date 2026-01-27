'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='input-group'
			role='group'
			className={cn(
				'mint-:group/input-group mint-:border-input mint-:dark:bg-input/30 mint-:relative mint-:flex mint-:w-full mint-:items-center mint-:rounded-md mint-:border mint-:shadow-xs mint-:transition-[color,box-shadow] mint-:outline-none',
				'mint-:h-9 mint-:min-w-0 mint-:has-[>textarea]:h-auto',

				// Variants based on alignment.
				'mint-:has-[>[data-align=inline-start]]:[&>input]:pl-2',
				'mint-:has-[>[data-align=inline-end]]:[&>input]:pr-2',
				'mint-:has-[>[data-align=block-start]]:h-auto mint-:has-[>[data-align=block-start]]:flex-col mint-:has-[>[data-align=block-start]]:[&>input]:pb-3',
				'mint-:has-[>[data-align=block-end]]:h-auto mint-:has-[>[data-align=block-end]]:flex-col mint-:has-[>[data-align=block-end]]:[&>input]:pt-3',

				// Focus state.
				'mint-:has-[[data-slot=input-group-control]:focus-visible]:border-ring mint-:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 mint-:has-[[data-slot=input-group-control]:focus-visible]:ring-[0.2rem]',

				// Error state.
				'mint-:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 mint-:has-[[data-slot][aria-invalid=true]]:border-destructive mint-:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

				className
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	'mint-:text-muted-foreground mint-:flex mint-:h-auto mint-:cursor-text mint-:items-center mint-:justify-center mint-:gap-2 mint-:py-1.5 mint-:text-sm mint-:font-medium mint-:select-none mint-:[&>svg:not([class*=size-])]:size-4 mint-:[&>kbd]:rounded-[calc(var(--radius)-5px)] mint-:group-data-[disabled=true]/input-group:opacity-50',
	{
		variants: {
			align: {
				'inline-start':
					'mint-:order-first mint-:pl-3 mint-:has-[>button]:ml-[-0.45rem] mint-:has-[>kbd]:ml-[-0.35rem]',
				'inline-end':
					'mint-:order-last mint-:pr-3 mint-:has-[>button]:mr-[-0.45rem] mint-:has-[>kbd]:mr-[-0.35rem]',
				'block-start':
					'mint-:order-first mint-:w-full mint-:justify-start mint-:px-3 mint-:pt-3 mint-:[.border-b]:pb-3 mint-:group-has-[>input]/input-group:pt-2.5',
				'block-end':
					'mint-:order-last mint-:w-full mint-:justify-start mint-:px-3 mint-:pb-3 mint-:[.border-t]:pt-3 mint-:group-has-[>input]/input-group:pb-2.5',
			},
		},
		defaultVariants: {
			align: 'inline-start',
		},
	}
);

function InputGroupAddon({
	className,
	align = 'inline-start',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			role='group'
			data-slot='input-group-addon'
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest('button')) {
					return;
				}
				e.currentTarget.parentElement?.querySelector('input')?.focus();
			}}
			{...props}
		/>
	);
}

const inputGroupButtonVariants = cva(
	'mint-:text-sm mint-:shadow-none mint-:flex mint-:gap-2 mint-:items-center',
	{
		variants: {
			size: {
				xs: 'mint-:h-6 mint-:gap-1 mint-:px-2 mint-:rounded-[calc(var(--radius)-5px)] mint-:[&>svg:not([class*=size-])]:size-3.5 mint-:has-[>svg]:px-2',
				sm: 'mint-:h-8 mint-:px-2.5 mint-:gap-1.5 mint-:rounded-md mint-:has-[>svg]:px-2.5',
				'icon-xs':
					'mint-:size-6 mint-:rounded-[calc(var(--radius)-5px)] mint-:p-0 mint-:has-[>svg]:p-0',
				'icon-sm': 'mint-:size-8 mint-:p-0 mint-:has-[>svg]:p-0',
			},
		},
		defaultVariants: {
			size: 'xs',
		},
	}
);

function InputGroupButton({
	className,
	type = 'button',
	variant = 'ghost',
	size = 'xs',
	...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
	VariantProps<typeof inputGroupButtonVariants>) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	);
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			className={cn(
				'mint-:text-muted-foreground mint-:flex mint-:items-center mint-:gap-2 mint-:text-sm mint-:[&_svg]:pointer-events-none mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			{...props}
		/>
	);
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
	return (
		<Input
			data-slot='input-group-control'
			className={cn(
				'mint-:flex-1 mint-:rounded-none mint-:border-0 mint-:bg-transparent mint-:shadow-none mint-:focus-visible:ring-0 mint-:dark:bg-transparent',
				className
			)}
			{...props}
		/>
	);
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<Textarea
			data-slot='input-group-control'
			className={cn(
				'mint-:flex-1 mint-:resize-none mint-:rounded-none mint-:border-0 mint-:bg-transparent mint-:py-3 mint-:shadow-none mint-:focus-visible:ring-0 mint-:dark:bg-transparent',
				className
			)}
			{...props}
		/>
	);
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
};
