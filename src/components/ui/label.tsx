'use client';

import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

function Label({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot='label'
			className={cn(
				'mint-:flex mint-:items-center mint-:gap-2 mint-:text-sm mint-:leading-none mint-:font-medium mint-:select-none mint-:group-data-[disabled=true]:pointer-events-none mint-:group-data-[disabled=true]:opacity-50 mint-:peer-disabled:cursor-not-allowed mint-:peer-disabled:opacity-50',
				className
			)}
			{...props}
		/>
	);
}

export { Label };
