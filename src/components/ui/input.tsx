import { cn } from '@/lib/utils';
import * as React from 'react';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'mint-:file:text-foreground mint-:placeholder:text-muted-foreground mint-:selection:bg-primary mint-:selection:text-primary-foreground mint-:dark:bg-input/30 mint-:border-input mint-:h-9 mint-:w-full mint-:min-w-0 mint-:rounded-md mint-:border mint-:bg-transparent mint-:px-3 mint-:py-1 mint-:text-base mint-:shadow-xs mint-:transition-[color,box-shadow] mint-:outline-none mint-:file:inline-flex mint-:file:h-7 mint-:file:border-0 mint-:file:bg-transparent mint-:file:text-sm mint-:file:font-medium mint-:disabled:pointer-events-none mint-:disabled:cursor-not-allowed mint-:disabled:opacity-50 mint-:md:text-sm',
				'mint-:focus-visible:border-ring mint-:focus-visible:ring-ring/50 mint-:focus-visible:ring-[0.2rem]',
				'mint-:aria-invalid:ring-destructive/20 mint-:dark:aria-invalid:ring-destructive/40 mint-:aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	);
}

export { Input };
