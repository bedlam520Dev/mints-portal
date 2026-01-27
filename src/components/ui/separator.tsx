'use client';

import { cn } from '@/lib/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

function Separator({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
	return (
		<SeparatorPrimitive.Root
			data-slot='separator'
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'mint-:bg-border mint-:shrink-0 mint-:data-[orientation=horizontal]:h-px mint-:data-[orientation=horizontal]:w-full mint-:data-[orientation=vertical]:h-full mint-:data-[orientation=vertical]:w-px',
				className
			)}
			{...props}
		/>
	);
}

export { Separator };
