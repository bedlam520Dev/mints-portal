'use client';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot='tooltip-provider'
			delayDuration={delayDuration}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
	return (
		<TooltipProvider>
			<TooltipPrimitive.Root
				data-slot='tooltip'
				{...props}
			/>
		</TooltipProvider>
	);
}

function TooltipTrigger({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
	return (
		<TooltipPrimitive.Trigger
			data-slot='tooltip-trigger'
			{...props}
		/>
	);
}

function TooltipContent({
	className,
	sideOffset = 0,
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				data-slot='tooltip-content'
				sideOffset={sideOffset}
				className={cn(
					'mint-:bg-foreground mint-:text-background mint-:animate-in mint-:fade-in-0 mint-:zoom-in-95 mint-:data-[state=closed]:animate-out mint-:data-[state=closed]:fade-out-0 mint-:data-[state=closed]:zoom-out-95 mint-:data-[side=bottom]:slide-in-from-top-2 mint-:data-[side=left]:slide-in-from-right-2 mint-:data-[side=right]:slide-in-from-left-2 mint-:data-[side=top]:slide-in-from-bottom-2 mint-:z-50 mint-:w-fit mint-:origin-(--radix-tooltip-content-transform-origin) mint-:rounded-md mint-:px-3 mint-:py-1.5 mint-:text-xs mint-:text-balance',
					className
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow className='mint-:bg-foreground mint-:fill-foreground mint-:z-50 mint-:size-2.5 mint-:translate-y-[calc(-50%_-_0.125rem)] mint-:rotate-45 mint-:rounded-[0.125rem]' />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
