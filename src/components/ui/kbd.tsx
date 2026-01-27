import { cn } from '@/lib/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
	return (
		<kbd
			data-slot='kbd'
			className={cn(
				'mint-:bg-muted mint-:text-muted-foreground mint-:pointer-events-none mint-:inline-flex mint-:h-5 mint-:w-fit mint-:min-w-5 mint-:items-center mint-:justify-center mint-:gap-1 mint-:rounded-sm mint-:px-1 mint-:font-sans mint-:text-xs mint-:font-medium mint-:select-none',
				'mint-:[&_svg:not([class*=size-])]:size-3',
				'mint-:[[data-slot=tooltip-content]_&]:bg-background/20 mint-:[[data-slot=tooltip-content]_&]:text-background mint-:dark:[[data-slot=tooltip-content]_&]:bg-background/10',
				className
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<kbd
			data-slot='kbd-group'
			className={cn('mint-:inline-flex mint-:items-center mint-:gap-1', className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
