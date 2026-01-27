import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label='breadcrumb'
			data-slot='breadcrumb'
			{...props}
		/>
	);
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
	return (
		<ol
			data-slot='breadcrumb-list'
			className={cn(
				'mint-:text-muted-foreground mint-:flex mint-:flex-wrap mint-:items-center mint-:gap-1.5 mint-:text-sm mint-:break-words mint-:sm:gap-2.5',
				className
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='breadcrumb-item'
			className={cn('mint-:inline-flex mint-:items-center mint-:gap-1.5', className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<'a'> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : 'a';

	return (
		<Comp
			data-slot='breadcrumb-link'
			className={cn('mint-:hover:text-foreground mint-:transition-colors', className)}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot='breadcrumb-page'
			role='link'
			aria-disabled='true'
			aria-current='page'
			className={cn('mint-:text-foreground mint-:font-normal', className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='breadcrumb-separator'
			role='presentation'
			aria-hidden='true'
			className={cn('mint-:[&>svg]:size-3.5', className)}
			{...props}
		>
			{children ?? <ChevronRight />}
		</li>
	);
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot='breadcrumb-ellipsis'
			role='presentation'
			aria-hidden='true'
			className={cn(
				'mint-:flex mint-:size-9 mint-:items-center mint-:justify-center',
				className
			)}
			{...props}
		>
			<MoreHorizontal className='mint-:size-4' />
			<span className='mint-:sr-only'>More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
