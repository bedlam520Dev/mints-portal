import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

function NativeSelect({
	className,
	size = 'default',
	...props
}: Omit<React.ComponentProps<'select'>, 'size'> & { size?: 'sm' | 'default' }) {
	return (
		<div
			className='mint-:group/native-select mint-:relative mint-:w-fit mint-:has-[select:disabled]:opacity-50'
			data-slot='native-select-wrapper'
		>
			<select
				data-slot='native-select'
				data-size={size}
				className={cn(
					'mint-:border-input mint-:placeholder:text-muted-foreground mint-:selection:bg-primary mint-:selection:text-primary-foreground mint-:dark:bg-input/30 mint-:dark:hover:bg-input/50 mint-:h-9 mint-:w-full mint-:min-w-0 mint-:appearance-none mint-:rounded-md mint-:border mint-:bg-transparent mint-:px-3 mint-:py-2 mint-:pr-9 mint-:text-sm mint-:shadow-xs mint-:transition-[color,box-shadow] mint-:outline-none mint-:disabled:pointer-events-none mint-:disabled:cursor-not-allowed mint-:data-[size=sm]:h-8 mint-:data-[size=sm]:py-1',
					'mint-:focus-visible:border-ring mint-:focus-visible:ring-ring/50 mint-:focus-visible:ring-[0.2rem]',
					'mint-:aria-invalid:ring-destructive/20 mint-:dark:aria-invalid:ring-destructive/40 mint-:aria-invalid:border-destructive',
					className
				)}
				{...props}
			/>
			<ChevronDownIcon
				className='mint-:text-muted-foreground mint-:pointer-events-none mint-:absolute mint-:top-1/2 mint-:right-3.5 mint-:size-4 mint-:-translate-y-1/2 mint-:opacity-50 mint-:select-none'
				aria-hidden='true'
				data-slot='native-select-icon'
			/>
		</div>
	);
}

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
	return (
		<option
			data-slot='native-select-option'
			{...props}
		/>
	);
}

function NativeSelectOptGroup({
	className,
	...props
}: React.ComponentProps<'optgroup'>) {
	return (
		<optgroup
			data-slot='native-select-optgroup'
			className={cn(className)}
			{...props}
		/>
	);
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
