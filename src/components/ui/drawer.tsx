'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
	return (
		<DrawerPrimitive.Root
			data-slot='drawer'
			{...props}
		/>
	);
}

function DrawerTrigger({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	return (
		<DrawerPrimitive.Trigger
			data-slot='drawer-trigger'
			{...props}
		/>
	);
}

function DrawerPortal({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
	return (
		<DrawerPrimitive.Portal
			data-slot='drawer-portal'
			{...props}
		/>
	);
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return (
		<DrawerPrimitive.Close
			data-slot='drawer-close'
			{...props}
		/>
	);
}

function DrawerOverlay({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
	return (
		<DrawerPrimitive.Overlay
			data-slot='drawer-overlay'
			className={cn(
				'mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:fixed mint-:inset-0 mint-:z-50 mint-:bg-black/50',
				className
			)}
			{...props}
		/>
	);
}

function DrawerContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
	return (
		<DrawerPortal data-slot='drawer-portal'>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot='drawer-content'
				className={cn(
					'mint-:group/drawer-content mint-:bg-background mint-:fixed mint-:z-50 mint-:flex mint-:h-auto mint-:flex-col',
					'mint-:data-[vaul-drawer-direction=top]:inset-x-0 mint-:data-[vaul-drawer-direction=top]:top-0 mint-:data-[vaul-drawer-direction=top]:mb-24 mint-:data-[vaul-drawer-direction=top]:max-h-[80vh] mint-:data-[vaul-drawer-direction=top]:rounded-b-lg mint-:data-[vaul-drawer-direction=top]:border-b',
					'mint-:data-[vaul-drawer-direction=bottom]:inset-x-0 mint-:data-[vaul-drawer-direction=bottom]:bottom-0 mint-:data-[vaul-drawer-direction=bottom]:mt-24 mint-:data-[vaul-drawer-direction=bottom]:max-h-[80vh] mint-:data-[vaul-drawer-direction=bottom]:rounded-t-lg mint-:data-[vaul-drawer-direction=bottom]:border-t',
					'mint-:data-[vaul-drawer-direction=right]:inset-y-0 mint-:data-[vaul-drawer-direction=right]:right-0 mint-:data-[vaul-drawer-direction=right]:w-3/4 mint-:data-[vaul-drawer-direction=right]:border-l mint-:data-[vaul-drawer-direction=right]:sm:max-w-sm',
					'mint-:data-[vaul-drawer-direction=left]:inset-y-0 mint-:data-[vaul-drawer-direction=left]:left-0 mint-:data-[vaul-drawer-direction=left]:w-3/4 mint-:data-[vaul-drawer-direction=left]:border-r mint-:data-[vaul-drawer-direction=left]:sm:max-w-sm',
					className
				)}
				{...props}
			>
				<div className='mint-:bg-muted mint-:mx-auto mint-:mt-4 mint-:hidden mint-:h-2 mint-:w-[100px] mint-:shrink-0 mint-:rounded-full mint-:group-data-[vaul-drawer-direction=bottom]/drawer-content:block' />
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='drawer-header'
			className={cn(
				'mint-:flex mint-:flex-col mint-:gap-0.5 mint-:p-4 mint-:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center mint-:group-data-[vaul-drawer-direction=top]/drawer-content:text-center mint-:md:gap-1.5 mint-:md:text-left',
				className
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='drawer-footer'
			className={cn(
				'mint-:mt-auto mint-:flex mint-:flex-col mint-:gap-2 mint-:p-4',
				className
			)}
			{...props}
		/>
	);
}

function DrawerTitle({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return (
		<DrawerPrimitive.Title
			data-slot='drawer-title'
			className={cn('mint-:text-foreground mint-:font-semibold', className)}
			{...props}
		/>
	);
}

function DrawerDescription({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
	return (
		<DrawerPrimitive.Description
			data-slot='drawer-description'
			className={cn('mint-:text-muted-foreground mint-:text-sm', className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
