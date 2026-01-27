'use client';

import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return (
		<DialogPrimitive.Root
			data-slot='dialog'
			{...props}
		/>
	);
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return (
		<DialogPrimitive.Trigger
			data-slot='dialog-trigger'
			{...props}
		/>
	);
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return (
		<DialogPrimitive.Portal
			data-slot='dialog-portal'
			{...props}
		/>
	);
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return (
		<DialogPrimitive.Close
			data-slot='dialog-close'
			{...props}
		/>
	);
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				'mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:fixed mint-:inset-0 mint-:z-50 mint-:bg-black/50',
				className
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal data-slot='dialog-portal'>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot='dialog-content'
				className={cn(
					'mint-:bg-background mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:data-[state=closed]:zoom-out-95 mint-:data-[state=open]:zoom-in-95 mint-:fixed mint-:top-[50%] mint-:left-[50%] mint-:z-50 mint-:grid mint-:w-full mint-:max-w-[calc(100%-2rem)] mint-:translate-x-[-50%] mint-:translate-y-[-50%] mint-:gap-4 mint-:rounded-lg mint-:border mint-:p-6 mint-:shadow-lg mint-:duration-200 mint-:outline-none mint-:sm:max-w-lg',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						className='mint-:ring-offset-background mint-:focus:ring-ring mint-:data-[state=open]:bg-accent mint-:data-[state=open]:text-muted-foreground mint-:absolute mint-:top-4 mint-:right-4 mint-:rounded-xs mint-:opacity-70 mint-:transition-opacity mint-:hover:opacity-100 mint-:focus:ring-2 mint-:focus:ring-offset-2 mint-:focus:outline-hidden mint-:disabled:pointer-events-none mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0 mint-:[&_svg:not([class*=size-])]:size-4'
					>
						<XIcon />
						<span className='mint-:sr-only'>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='dialog-header'
			className={cn(
				'mint-:flex mint-:flex-col mint-:gap-2 mint-:text-center mint-:sm:text-left',
				className
			)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'mint-:flex mint-:flex-col-reverse mint-:gap-2 mint-:sm:flex-row mint-:sm:justify-end',
				className
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			className={cn('mint-:text-lg mint-:leading-none mint-:font-semibold', className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			className={cn('mint-:text-muted-foreground mint-:text-sm', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
