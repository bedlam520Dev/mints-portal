'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';
import * as React from 'react';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
	state: 'expanded' | 'collapsed';
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.');
	}

	return context;
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<'div'> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === 'function' ? value(open) : value;
			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[setOpenProp, open]
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [isMobile, setOpen, setOpenMobile]);

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleSidebar]);

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? 'expanded' : 'collapsed';

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot='sidebar-wrapper'
					style={
						{
							'--sidebar-width': SIDEBAR_WIDTH,
							'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={cn(
						'mint-:group/sidebar-wrapper mint-:has-data-[variant=inset]:bg-sidebar mint-:flex mint-:min-h-svh mint-:w-full',
						className
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	side = 'left',
	variant = 'sidebar',
	collapsible = 'offcanvas',
	className,
	children,
	...props
}: React.ComponentProps<'div'> & {
	side?: 'left' | 'right';
	variant?: 'sidebar' | 'floating' | 'inset';
	collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === 'none') {
		return (
			<div
				data-slot='sidebar'
				className={cn(
					'mint-:bg-sidebar mint-:text-sidebar-foreground mint-:flex mint-:h-full mint-:w-(--sidebar-width) mint-:flex-col',
					className
				)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<Sheet
				open={openMobile}
				onOpenChange={setOpenMobile}
				{...props}
			>
				<SheetContent
					data-sidebar='sidebar'
					data-slot='sidebar'
					data-mobile='true'
					className='mint-:bg-sidebar mint-:text-sidebar-foreground mint-:w-(--sidebar-width) mint-:p-0 mint-:[&>button]:hidden'
					style={
						{
							'--sidebar-width': SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
					side={side}
				>
					<SheetHeader className='mint-:sr-only'>
						<SheetTitle>Sidebar</SheetTitle>
						<SheetDescription>Displays the mobile sidebar.</SheetDescription>
					</SheetHeader>
					<div className='mint-:flex mint-:h-full mint-:w-full mint-:flex-col'>
						{children}
					</div>
				</SheetContent>
			</Sheet>
		);
	}

	return (
		<div
			className='mint-:group mint-:peer mint-:text-sidebar-foreground mint-:hidden mint-:md:block'
			data-state={state}
			data-collapsible={state === 'collapsed' ? collapsible : ''}
			data-variant={variant}
			data-side={side}
			data-slot='sidebar'
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot='sidebar-gap'
				className={cn(
					'mint-:relative mint-:w-(--sidebar-width) mint-:bg-transparent mint-:transition-[width] mint-:duration-200 mint-:ease-linear',
					'mint-:group-data-[collapsible=offcanvas]:w-0',
					'mint-:group-data-[side=right]:rotate-180',
					variant === 'floating' || variant === 'inset'
						? 'mint-:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
						: 'mint-:group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
				)}
			/>
			<div
				data-slot='sidebar-container'
				className={cn(
					'mint-:fixed mint-:inset-y-0 mint-:z-10 mint-:hidden mint-:h-svh mint-:w-(--sidebar-width) mint-:transition-[left,right,width] mint-:duration-200 mint-:ease-linear mint-:md:flex',
					side === 'left'
						? 'mint-:left-0 mint-:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
						: 'mint-:right-0 mint-:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
					// Adjust the padding for floating and inset variants.
					variant === 'floating' || variant === 'inset'
						? 'mint-:p-2 mint-:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+0.125rem)]'
						: 'mint-:group-data-[collapsible=icon]:w-(--sidebar-width-icon) mint-:group-data-[side=left]:border-r mint-:group-data-[side=right]:border-l',
					className
				)}
				{...props}
			>
				<div
					data-sidebar='sidebar'
					data-slot='sidebar-inner'
					className='mint-:bg-sidebar mint-:group-data-[variant=floating]:border-sidebar-border mint-:flex mint-:h-full mint-:w-full mint-:flex-col mint-:group-data-[variant=floating]:rounded-lg mint-:group-data-[variant=floating]:border mint-:group-data-[variant=floating]:shadow-sm'
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function SidebarTrigger({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar='trigger'
			data-slot='sidebar-trigger'
			variant='ghost'
			size='icon'
			className={cn('mint-:size-7', className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<PanelLeftIcon />
			<span className='mint-:sr-only'>Toggle Sidebar</span>
		</Button>
	);
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			data-sidebar='rail'
			data-slot='sidebar-rail'
			aria-label='Toggle Sidebar'
			tabIndex={-1}
			onClick={toggleSidebar}
			title='Toggle Sidebar'
			className={cn(
				'mint-:hover:after:bg-sidebar-border mint-:absolute mint-:inset-y-0 mint-:z-20 mint-:hidden mint-:w-4 mint-:-translate-x-1/2 mint-:transition-all mint-:ease-linear mint-:group-data-[side=left]:-right-4 mint-:group-data-[side=right]:left-0 mint-:after:absolute mint-:after:inset-y-0 mint-:after:left-1/2 mint-:after:w-[0.125rem] mint-:sm:flex',
				'mint-:in-data-[side=left]:cursor-w-resize mint-:in-data-[side=right]:cursor-e-resize',
				'mint-:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize mint-:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
				'mint-:hover:group-data-[collapsible=offcanvas]:bg-sidebar mint-:group-data-[collapsible=offcanvas]:translate-x-0 mint-:group-data-[collapsible=offcanvas]:after:left-full',
				'mint-:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
				'mint-:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
				className
			)}
			{...props}
		/>
	);
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
	return (
		<main
			data-slot='sidebar-inset'
			className={cn(
				'mint-:bg-background mint-:relative mint-:flex mint-:w-full mint-:flex-1 mint-:flex-col',
				'mint-:md:peer-data-[variant=inset]:m-2 mint-:md:peer-data-[variant=inset]:ml-0 mint-:md:peer-data-[variant=inset]:rounded-xl mint-:md:peer-data-[variant=inset]:shadow-sm mint-:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
				className
			)}
			{...props}
		/>
	);
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot='sidebar-input'
			data-sidebar='input'
			className={cn(
				'mint-:bg-background mint-:h-8 mint-:w-full mint-:shadow-none',
				className
			)}
			{...props}
		/>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-header'
			data-sidebar='header'
			className={cn('mint-:flex mint-:flex-col mint-:gap-2 mint-:p-2', className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-footer'
			data-sidebar='footer'
			className={cn('mint-:flex mint-:flex-col mint-:gap-2 mint-:p-2', className)}
			{...props}
		/>
	);
}

function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot='sidebar-separator'
			data-sidebar='separator'
			className={cn('mint-:bg-sidebar-border mint-:mx-2 mint-:w-auto', className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-content'
			data-sidebar='content'
			className={cn(
				'mint-:flex mint-:min-h-0 mint-:flex-1 mint-:flex-col mint-:gap-2 mint-:overflow-auto mint-:group-data-[collapsible=icon]:overflow-hidden',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-group'
			data-sidebar='group'
			className={cn(
				'mint-:relative mint-:flex mint-:w-full mint-:min-w-0 mint-:flex-col mint-:p-2',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			data-slot='sidebar-group-label'
			data-sidebar='group-label'
			className={cn(
				'mint-:text-sidebar-foreground/70 mint-:ring-sidebar-ring mint-:flex mint-:h-8 mint-:shrink-0 mint-:items-center mint-:rounded-md mint-:px-2 mint-:text-xs mint-:font-medium mint-:outline-hidden mint-:transition-[margin,opacity] mint-:duration-200 mint-:ease-linear mint-:focus-visible:ring-2 mint-:[&>svg]:size-4 mint-:[&>svg]:shrink-0',
				'mint-:group-data-[collapsible=icon]:-mt-8 mint-:group-data-[collapsible=icon]:opacity-0',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='sidebar-group-action'
			data-sidebar='group-action'
			className={cn(
				'mint-:text-sidebar-foreground mint-:ring-sidebar-ring mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground mint-:absolute mint-:top-3.5 mint-:right-3 mint-:flex mint-:aspect-square mint-:w-5 mint-:items-center mint-:justify-center mint-:rounded-md mint-:p-0 mint-:outline-hidden mint-:transition-transform mint-:focus-visible:ring-2 mint-:[&>svg]:size-4 mint-:[&>svg]:shrink-0',
				// Increases the hit area of the button on mobile.
				'mint-:after:absolute mint-:after:-inset-2 mint-:md:after:hidden',
				'mint-:group-data-[collapsible=icon]:hidden',
				className
			)}
			{...props}
		/>
	);
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-group-content'
			data-sidebar='group-content'
			className={cn('mint-:w-full mint-:text-sm', className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot='sidebar-menu'
			data-sidebar='menu'
			className={cn(
				'mint-:flex mint-:w-full mint-:min-w-0 mint-:flex-col mint-:gap-1',
				className
			)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='sidebar-menu-item'
			data-sidebar='menu-item'
			className={cn('mint-:group/menu-item mint-:relative', className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	'mint-:peer/menu-button mint-:flex mint-:w-full mint-:items-center mint-:gap-2 mint-:overflow-hidden mint-:rounded-md mint-:p-2 mint-:text-left mint-:text-sm mint-:outline-hidden mint-:ring-sidebar-ring mint-:transition-[width,height,padding] mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground mint-:focus-visible:ring-2 mint-:active:bg-sidebar-accent mint-:active:text-sidebar-accent-foreground mint-:disabled:pointer-events-none mint-:disabled:opacity-50 mint-:group-has-data-[sidebar=menu-action]/menu-item:pr-8 mint-:aria-disabled:pointer-events-none mint-:aria-disabled:opacity-50 mint-:data-[active=true]:bg-sidebar-accent mint-:data-[active=true]:font-medium mint-:data-[active=true]:text-sidebar-accent-foreground mint-:data-[state=open]:hover:bg-sidebar-accent mint-:data-[state=open]:hover:text-sidebar-accent-foreground mint-:group-data-[collapsible=icon]:size-8! mint-:group-data-[collapsible=icon]:p-2! mint-:[&>span:last-child]:truncate mint-:[&>svg]:size-4 mint-:[&>svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground',
				outline:
					'mint-:bg-background mint-:shadow-[0_0_0_0.05625rem_hsl(var(--sidebar-border))] mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground mint-:hover:shadow-[0_0_0_0.05625rem_hsl(var(--sidebar-accent))]',
			},
			size: {
				default: 'mint-:h-8 mint-:text-sm',
				sm: 'mint-:h-7 mint-:text-xs',
				lg: 'mint-:h-12 mint-:text-sm mint-:group-data-[collapsible=icon]:p-0!',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = 'default',
	size = 'default',
	tooltip,
	className,
	...props
}: React.ComponentProps<'button'> & {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : 'button';
	const { isMobile, state } = useSidebar();

	const button = (
		<Comp
			data-slot='sidebar-menu-button'
			data-sidebar='menu-button'
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);

	if (!tooltip) {
		return button;
	}

	if (typeof tooltip === 'string') {
		tooltip = {
			children: tooltip,
		};
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent
				side='right'
				align='center'
				hidden={state !== 'collapsed' || isMobile}
				{...tooltip}
			/>
		</Tooltip>
	);
}

function SidebarMenuAction({
	className,
	asChild = false,
	showOnHover = false,
	...props
}: React.ComponentProps<'button'> & {
	asChild?: boolean;
	showOnHover?: boolean;
}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='sidebar-menu-action'
			data-sidebar='menu-action'
			className={cn(
				'mint-:text-sidebar-foreground mint-:ring-sidebar-ring mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground mint-:peer-hover/menu-button:text-sidebar-accent-foreground mint-:absolute mint-:top-1.5 mint-:right-1 mint-:flex mint-:aspect-square mint-:w-5 mint-:items-center mint-:justify-center mint-:rounded-md mint-:p-0 mint-:outline-hidden mint-:transition-transform mint-:focus-visible:ring-2 mint-:[&>svg]:size-4 mint-:[&>svg]:shrink-0',
				// Increases the hit area of the button on mobile.
				'mint-:after:absolute mint-:after:-inset-2 mint-:md:after:hidden',
				'mint-:peer-data-[size=sm]/menu-button:top-1',
				'mint-:peer-data-[size=default]/menu-button:top-1.5',
				'mint-:peer-data-[size=lg]/menu-button:top-2.5',
				'mint-:group-data-[collapsible=icon]:hidden',
				showOnHover &&
					'mint-:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground mint-:group-focus-within/menu-item:opacity-100 mint-:group-hover/menu-item:opacity-100 mint-:data-[state=open]:opacity-100 mint-:md:opacity-0',
				className
			)}
			{...props}
		/>
	);
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='sidebar-menu-badge'
			data-sidebar='menu-badge'
			className={cn(
				'mint-:text-sidebar-foreground mint-:pointer-events-none mint-:absolute mint-:right-1 mint-:flex mint-:h-5 mint-:min-w-5 mint-:items-center mint-:justify-center mint-:rounded-md mint-:px-1 mint-:text-xs mint-:font-medium mint-:tabular-nums mint-:select-none',
				'mint-:peer-hover/menu-button:text-sidebar-accent-foreground mint-:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
				'mint-:peer-data-[size=sm]/menu-button:top-1',
				'mint-:peer-data-[size=default]/menu-button:top-1.5',
				'mint-:peer-data-[size=lg]/menu-button:top-2.5',
				'mint-:group-data-[collapsible=icon]:hidden',
				className
			)}
			{...props}
		/>
	);
}

function SidebarMenuSkeleton({
	className,
	showIcon = false,
	...props
}: React.ComponentProps<'div'> & {
	showIcon?: boolean;
}) {
	// Random width between 50 to 90%.
	const [width] = React.useState(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	});

	return (
		<div
			data-slot='sidebar-menu-skeleton'
			data-sidebar='menu-skeleton'
			className={cn(
				'mint-:flex mint-:h-8 mint-:items-center mint-:gap-2 mint-:rounded-md mint-:px-2',
				className
			)}
			{...props}
		>
			{showIcon && (
				<Skeleton
					className='mint-:size-4 mint-:rounded-md'
					data-sidebar='menu-skeleton-icon'
				/>
			)}
			<Skeleton
				className='mint-:h-4 mint-:max-w-(--skeleton-width) mint-:flex-1'
				data-sidebar='menu-skeleton-text'
				style={
					{
						'--skeleton-width': width,
					} as React.CSSProperties
				}
			/>
		</div>
	);
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot='sidebar-menu-sub'
			data-sidebar='menu-sub'
			className={cn(
				'mint-:border-sidebar-border mint-:mx-3.5 mint-:flex mint-:min-w-0 mint-:translate-x-px mint-:flex-col mint-:gap-1 mint-:border-l mint-:px-2.5 mint-:py-0.5',
				'mint-:group-data-[collapsible=icon]:hidden',
				className
			)}
			{...props}
		/>
	);
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot='sidebar-menu-sub-item'
			data-sidebar='menu-sub-item'
			className={cn('mint-:group/menu-sub-item mint-:relative', className)}
			{...props}
		/>
	);
}

function SidebarMenuSubButton({
	asChild = false,
	size = 'md',
	isActive = false,
	className,
	...props
}: React.ComponentProps<'a'> & {
	asChild?: boolean;
	size?: 'sm' | 'md';
	isActive?: boolean;
}) {
	const Comp = asChild ? Slot : 'a';

	return (
		<Comp
			data-slot='sidebar-menu-sub-button'
			data-sidebar='menu-sub-button'
			data-size={size}
			data-active={isActive}
			className={cn(
				'mint-:text-sidebar-foreground mint-:ring-sidebar-ring mint-:hover:bg-sidebar-accent mint-:hover:text-sidebar-accent-foreground mint-:active:bg-sidebar-accent mint-:active:text-sidebar-accent-foreground mint-:[&>svg]:text-sidebar-accent-foreground mint-:flex mint-:h-7 mint-:min-w-0 mint-:-translate-x-px mint-:items-center mint-:gap-2 mint-:overflow-hidden mint-:rounded-md mint-:px-2 mint-:outline-hidden mint-:focus-visible:ring-2 mint-:disabled:pointer-events-none mint-:disabled:opacity-50 mint-:aria-disabled:pointer-events-none mint-:aria-disabled:opacity-50 mint-:[&>span:last-child]:truncate mint-:[&>svg]:size-4 mint-:[&>svg]:shrink-0',
				'mint-:data-[active=true]:bg-sidebar-accent mint-:data-[active=true]:text-sidebar-accent-foreground',
				size === 'sm' && 'mint-:text-xs',
				size === 'md' && 'mint-:text-sm',
				'mint-:group-data-[collapsible=icon]:hidden',
				className
			)}
			{...props}
		/>
	);
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};
