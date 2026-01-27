'use client';

import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

function DropdownMenu({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	return (
		<DropdownMenuPrimitive.Root
			data-slot='dropdown-menu'
			{...props}
		/>
	);
}

function DropdownMenuPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return (
		<DropdownMenuPrimitive.Portal
			data-slot='dropdown-menu-portal'
			{...props}
		/>
	);
}

function DropdownMenuTrigger({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot='dropdown-menu-trigger'
			{...props}
		/>
	);
}

function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot='dropdown-menu-content'
				sideOffset={sideOffset}
				className={cn(
					'mint-:bg-popover mint-:text-popover-foreground mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:data-[state=closed]:zoom-out-95 mint-:data-[state=open]:zoom-in-95 mint-:data-[side=bottom]:slide-in-from-top-2 mint-:data-[side=left]:slide-in-from-right-2 mint-:data-[side=right]:slide-in-from-left-2 mint-:data-[side=top]:slide-in-from-bottom-2 mint-:z-50 mint-:max-h-(--radix-dropdown-menu-content-available-height) mint-:min-w-[8rem] mint-:origin-(--radix-dropdown-menu-content-transform-origin) mint-:overflow-x-hidden mint-:overflow-y-auto mint-:rounded-md mint-:border mint-:p-1 mint-:shadow-md',
					className
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

function DropdownMenuGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot='dropdown-menu-group'
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	inset,
	variant = 'default',
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean;
	variant?: 'default' | 'destructive';
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot='dropdown-menu-item'
			data-inset={inset}
			data-variant={variant}
			className={cn(
				'mint-:focus:bg-accent mint-:focus:text-accent-foreground mint-:data-[variant=destructive]:text-destructive mint-:data-[variant=destructive]:focus:bg-destructive/10 mint-:dark:data-[variant=destructive]:focus:bg-destructive/20 mint-:data-[variant=destructive]:focus:text-destructive mint-:data-[variant=destructive]:*:[svg]:!text-destructive mint-:[&_svg:not([class*=text-])]:text-muted-foreground mint-:relative mint-:flex mint-:cursor-default mint-:items-center mint-:gap-2 mint-:rounded-sm mint-:px-2 mint-:py-1.5 mint-:text-sm mint-:outline-hidden mint-:select-none mint-:data-[disabled]:pointer-events-none mint-:data-[disabled]:opacity-50 mint-:data-[inset]:pl-8 mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0 mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot='dropdown-menu-checkbox-item'
			className={cn(
				'mint-:focus:bg-accent mint-:focus:text-accent-foreground mint-:relative mint-:flex mint-:cursor-default mint-:items-center mint-:gap-2 mint-:rounded-sm mint-:py-1.5 mint-:pr-2 mint-:pl-8 mint-:text-sm mint-:outline-hidden mint-:select-none mint-:data-[disabled]:pointer-events-none mint-:data-[disabled]:opacity-50 mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0 mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			checked={checked}
			{...props}
		>
			<span className='mint-:pointer-events-none mint-:absolute mint-:left-2 mint-:flex mint-:size-3.5 mint-:items-center mint-:justify-center'>
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className='mint-:size-4' />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot='dropdown-menu-radio-group'
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot='dropdown-menu-radio-item'
			className={cn(
				'mint-:focus:bg-accent mint-:focus:text-accent-foreground mint-:relative mint-:flex mint-:cursor-default mint-:items-center mint-:gap-2 mint-:rounded-sm mint-:py-1.5 mint-:pr-2 mint-:pl-8 mint-:text-sm mint-:outline-hidden mint-:select-none mint-:data-[disabled]:pointer-events-none mint-:data-[disabled]:opacity-50 mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0 mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			{...props}
		>
			<span className='mint-:pointer-events-none mint-:absolute mint-:left-2 mint-:flex mint-:size-3.5 mint-:items-center mint-:justify-center'>
				<DropdownMenuPrimitive.ItemIndicator>
					<CircleIcon className='mint-:size-2 mint-:fill-current' />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

function DropdownMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot='dropdown-menu-label'
			data-inset={inset}
			className={cn(
				'mint-:px-2 mint-:py-1.5 mint-:text-sm mint-:font-medium mint-:data-[inset]:pl-8',
				className
			)}
			{...props}
		/>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot='dropdown-menu-separator'
			className={cn('mint-:bg-border mint-:-mx-1 mint-:my-1 mint-:h-px', className)}
			{...props}
		/>
	);
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot='dropdown-menu-shortcut'
			className={cn(
				'mint-:text-muted-foreground mint-:ml-auto mint-:text-xs mint-:tracking-widest',
				className
			)}
			{...props}
		/>
	);
}

function DropdownMenuSub({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
	return (
		<DropdownMenuPrimitive.Sub
			data-slot='dropdown-menu-sub'
			{...props}
		/>
	);
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot='dropdown-menu-sub-trigger'
			data-inset={inset}
			className={cn(
				'mint-:focus:bg-accent mint-:focus:text-accent-foreground mint-:data-[state=open]:bg-accent mint-:data-[state=open]:text-accent-foreground mint-:[&_svg:not([class*=text-])]:text-muted-foreground mint-:flex mint-:cursor-default mint-:items-center mint-:gap-2 mint-:rounded-sm mint-:px-2 mint-:py-1.5 mint-:text-sm mint-:outline-hidden mint-:select-none mint-:data-[inset]:pl-8 mint-:[&_svg]:pointer-events-none mint-:[&_svg]:shrink-0 mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className='mint-:ml-auto mint-:size-4' />
		</DropdownMenuPrimitive.SubTrigger>
	);
}

function DropdownMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot='dropdown-menu-sub-content'
			className={cn(
				'mint-:bg-popover mint-:text-popover-foreground mint-:data-[state=open]:animate-in mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=open]:fade-in-0 mint-:data-[state=closed]:zoom-out-95 mint-:data-[state=open]:zoom-in-95 mint-:data-[side=bottom]:slide-in-from-top-2 mint-:data-[side=left]:slide-in-from-right-2 mint-:data-[side=right]:slide-in-from-left-2 mint-:data-[side=top]:slide-in-from-bottom-2 mint-:z-50 mint-:min-w-[8rem] mint-:origin-(--radix-dropdown-menu-content-transform-origin) mint-:overflow-hidden mint-:rounded-md mint-:border mint-:p-1 mint-:shadow-lg',
				className
			)}
			{...props}
		/>
	);
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
};
