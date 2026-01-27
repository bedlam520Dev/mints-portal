'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot='table-container'
			className='mint-:relative mint-:w-full mint-:overflow-x-auto'
		>
			<table
				data-slot='table'
				className={cn('mint-:w-full mint-:caption-bottom mint-:text-sm', className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot='table-header'
			className={cn('mint-:[&_tr]:border-b', className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot='table-body'
			className={cn('mint-:[&_tr:last-child]:border-0', className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot='table-footer'
			className={cn(
				'mint-:bg-muted/50 mint-:border-t mint-:font-medium mint-:[&>tr]:last:border-b-0',
				className
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot='table-row'
			className={cn(
				'mint-:hover:bg-muted/50 mint-:data-[state=selected]:bg-muted mint-:border-b mint-:transition-colors',
				className
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot='table-head'
			className={cn(
				'mint-:text-foreground mint-:h-10 mint-:px-2 mint-:text-left mint-:align-middle mint-:font-medium mint-:whitespace-nowrap mint-:[&:has([role=checkbox])]:pr-0 mint-:[&>[role=checkbox]]:translate-y-[0.125rem]',
				className
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot='table-cell'
			className={cn(
				'mint-:p-2 mint-:align-middle mint-:whitespace-nowrap mint-:[&:has([role=checkbox])]:pr-0 mint-:[&>[role=checkbox]]:translate-y-[0.125rem]',
				className
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot='table-caption'
			className={cn('mint-:text-muted-foreground mint-:mt-4 mint-:text-sm', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
