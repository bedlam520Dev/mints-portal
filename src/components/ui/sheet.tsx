'use client';

import { cn } from '@/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return (
		<SheetPrimitive.Root
			data-slot='sheet'
			{...props}
		/>
	);
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return (
		<SheetPrimitive.Trigger
			data-slot='sheet-trigger'
			{...props}
		/>
	);
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return (
		<SheetPrimitive.Close
			data-slot='sheet-close'
			{...props}
		/>
	);
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return (
		<SheetPrimitive.Portal
			data-slot='sheet-portal'
			{...props}
		/>
	);
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot='sheet-overlay'
			className={cn(
				'mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:fixed mint-:inset-0 mint-:z-50 mint-:bg-black/50',
				className
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = 'right',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left';
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot='sheet-content'
				className={cn(
					'mint-:bg-background mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:fixed mint-:z-50 mint-:flex mint-:flex-col mint-:gap-4 mint-:shadow-lg mint-:transition mint-:ease-in-out mint-:data-[state=closed]:duration-300 mint-:data-[state=open]:duration-500',
					side === 'right' &&
						'mint-:data-[state=closed]:slide-out-to-right mint-:data-[state=open]:slide-in-from-right mint-:inset-y-0 mint-:right-0 mint-:h-full mint-:w-3/4 mint-:border-l mint-:sm:max-w-sm',
					side === 'left' &&
						'mint-:data-[state=closed]:slide-out-to-left mint-:data-[state=open]:slide-in-from-left mint-:inset-y-0 mint-:left-0 mint-:h-full mint-:w-3/4 mint-:border-r mint-:sm:max-w-sm',
					side === 'top' &&
						'mint-:data-[state=closed]:slide-out-to-top mint-:data-[state=open]:slide-in-from-top mint-:inset-x-0 mint-:top-0 mint-:h-auto mint-:border-b',
					side === 'bottom' &&
						'mint-:data-[state=closed]:slide-out-to-bottom mint-:data-[state=open]:slide-in-from-bottom mint-:inset-x-0 mint-:bottom-0 mint-:h-auto mint-:border-t',
					className
				)}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className='mint-:ring-offset-background mint-:focus:ring-ring mint-:data-[state=open]:bg-secondary mint-:absolute mint-:top-4 mint-:right-4 mint-:rounded-xs mint-:opacity-70 mint-:transition-opacity mint-:hover:opacity-100 mint-:focus:ring-2 mint-:focus:ring-offset-2 mint-:focus:outline-hidden mint-:disabled:pointer-events-none'>
					<XIcon className='mint-:size-4' />
					<span className='mint-:sr-only'>Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sheet-header'
			className={cn('mint-:flex mint-:flex-col mint-:gap-1.5 mint-:p-4', className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sheet-footer'
			className={cn(
				'mint-:mt-auto mint-:flex mint-:flex-col mint-:gap-2 mint-:p-4',
				className
			)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot='sheet-title'
			className={cn('mint-:text-foreground mint-:font-semibold', className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot='sheet-description'
			className={cn('mint-:text-muted-foreground mint-:text-sm', className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
