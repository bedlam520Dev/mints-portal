import { cn } from '@/lib/utils';
import * as React from 'react';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				'mint-:border-input mint-:placeholder:text-muted-foreground mint-:focus-visible:border-ring mint-:focus-visible:ring-ring/50 mint-:aria-invalid:ring-destructive/20 mint-:dark:aria-invalid:ring-destructive/40 mint-:aria-invalid:border-destructive mint-:dark:bg-input/30 mint-:flex mint-:field-sizing-content mint-:min-h-16 mint-:w-full mint-:rounded-md mint-:border mint-:bg-transparent mint-:px-3 mint-:py-2 mint-:text-base mint-:shadow-xs mint-:transition-[color,box-shadow] mint-:outline-none mint-:focus-visible:ring-[0.2rem] mint-:disabled:cursor-not-allowed mint-:disabled:opacity-50 mint-:md:text-sm',
				className
			)}
			{...props}
		/>
	);
}

export { Textarea };
