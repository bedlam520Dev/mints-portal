import { cn } from '@/lib/utils';
import * as React from 'react';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card'
			className={cn(
				'mint-:bg-card mint-:text-card-foreground mint-:flex mint-:flex-col mint-:gap-6 mint-:rounded-xl mint-:border mint-:py-6 mint-:shadow-sm',
				className
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				'mint-:@container/card-header mint-:grid mint-:auto-rows-min mint-:grid-rows-[auto_auto] mint-:items-start mint-:gap-2 mint-:px-6 mint-:has-data-[slot=card-action]:grid-cols-[1fr_auto] mint-:[.border-b]:pb-6',
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-title'
			className={cn('mint-:leading-none mint-:font-semibold', className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-description'
			className={cn('mint-:text-muted-foreground mint-:text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-action'
			className={cn(
				'mint-:col-start-2 mint-:row-span-2 mint-:row-start-1 mint-:self-start mint-:justify-self-end',
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-content'
			className={cn('mint-:px-6', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-footer'
			className={cn(
				'mint-:flex mint-:items-center mint-:px-6 mint-:[.border-t]:pt-6',
				className
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
