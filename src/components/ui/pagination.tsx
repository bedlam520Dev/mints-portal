import { buttonVariants, type Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role='navigation'
			aria-label='pagination'
			data-slot='pagination'
			className={cn(
				'mint-:mx-auto mint-:flex mint-:w-full mint-:justify-center',
				className
			)}
			{...props}
		/>
	);
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot='pagination-content'
			className={cn(
				'mint-:flex mint-:flex-row mint-:items-center mint-:gap-1',
				className
			)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='pagination-item'
			{...props}
		/>
	);
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
	React.ComponentProps<'a'>;

function PaginationLink({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? 'page' : undefined}
			data-slot='pagination-link'
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? 'outline' : 'ghost',
					size,
				}),
				className
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			size='default'
			className={cn('mint-:gap-1 mint-:px-2.5 mint-:sm:pl-2.5', className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className='mint-:hidden mint-:sm:block'>Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to next page'
			size='default'
			className={cn('mint-:gap-1 mint-:px-2.5 mint-:sm:pr-2.5', className)}
			{...props}
		>
			<span className='mint-:hidden mint-:sm:block'>Next</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot='pagination-ellipsis'
			className={cn(
				'mint-:flex mint-:size-9 mint-:items-center mint-:justify-center',
				className
			)}
			{...props}
		>
			<MoreHorizontalIcon className='mint-:size-4' />
			<span className='mint-:sr-only'>More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
