import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonGroupVariants = cva(
	'mint-:flex mint-:w-fit mint-:items-stretch mint-:[&>*]:focus-visible:z-10 mint-:[&>*]:focus-visible:relative mint-:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit mint-:[&>input]:flex-1 mint-:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md mint-:has-[>[data-slot=button-group]]:gap-2',
	{
		variants: {
			orientation: {
				horizontal:
					'mint-:[&>*:not(:first-child)]:rounded-l-none mint-:[&>*:not(:first-child)]:border-l-0 mint-:[&>*:not(:last-child)]:rounded-r-none',
				vertical:
					'mint-:flex-col mint-:[&>*:not(:first-child)]:rounded-t-none mint-:[&>*:not(:first-child)]:border-t-0 mint-:[&>*:not(:last-child)]:rounded-b-none',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	}
);

function ButtonGroup({
	className,
	orientation,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
	return (
		<div
			role='group'
			data-slot='button-group'
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	asChild = false,
	...props
}: React.ComponentProps<'div'> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			className={cn(
				'mint-:bg-muted mint-:flex mint-:items-center mint-:gap-2 mint-:rounded-md mint-:border mint-:px-4 mint-:text-sm mint-:font-medium mint-:shadow-xs mint-:[&_svg]:pointer-events-none mint-:[&_svg:not([class*=size-])]:size-4',
				className
			)}
			{...props}
		/>
	);
}

function ButtonGroupSeparator({
	className,
	orientation = 'vertical',
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot='button-group-separator'
			orientation={orientation}
			className={cn(
				'mint-:bg-input mint-:relative mint-:!m-0 mint-:self-stretch mint-:data-[orientation=vertical]:h-auto',
				className
			)}
			{...props}
		/>
	);
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
