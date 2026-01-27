'use client';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
	return (
		<fieldset
			data-slot='field-set'
			className={cn(
				'mint-:flex mint-:flex-col mint-:gap-6',
				'mint-:has-[>[data-slot=checkbox-group]]:gap-3 mint-:has-[>[data-slot=radio-group]]:gap-3',
				className
			)}
			{...props}
		/>
	);
}

function FieldLegend({
	className,
	variant = 'legend',
	...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
	return (
		<legend
			data-slot='field-legend'
			data-variant={variant}
			className={cn(
				'mint-:mb-3 mint-:font-medium',
				'mint-:data-[variant=legend]:text-base',
				'mint-:data-[variant=label]:text-sm',
				className
			)}
			{...props}
		/>
	);
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='field-group'
			className={cn(
				'mint-:group/field-group mint-:@container/field-group mint-:flex mint-:w-full mint-:flex-col mint-:gap-7 mint-:data-[slot=checkbox-group]:gap-3 mint-:[&>[data-slot=field-group]]:gap-4',
				className
			)}
			{...props}
		/>
	);
}

const fieldVariants = cva(
	'mint-:group/field mint-:flex mint-:w-full mint-:gap-3 mint-:data-[invalid=true]:text-destructive',
	{
		variants: {
			orientation: {
				vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
				horizontal: [
					'flex-row items-center',
					'[&>[data-slot=field-label]]:flex-auto',
					'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
				],
				responsive: [
					'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
					'@md/field-group:[&>[data-slot=field-label]]:flex-auto',
					'@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
				],
			},
		},
		defaultVariants: {
			orientation: 'vertical',
		},
	}
);

function Field({
	className,
	orientation = 'vertical',
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
	return (
		<div
			role='group'
			data-slot='field'
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='field-content'
			className={cn(
				'mint-:group/field-content mint-:flex mint-:flex-1 mint-:flex-col mint-:gap-1.5 mint-:leading-snug',
				className
			)}
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot='field-label'
			className={cn(
				'mint-:group/field-label mint-:peer/field-label mint-:flex mint-:w-fit mint-:gap-2 mint-:leading-snug mint-:group-data-[disabled=true]/field:opacity-50',
				'mint-:has-[>[data-slot=field]]:w-full mint-:has-[>[data-slot=field]]:flex-col mint-:has-[>[data-slot=field]]:rounded-md mint-:has-[>[data-slot=field]]:border mint-:[&>*]:data-[slot=field]:p-4',
				'mint-:has-data-[state=checked]:bg-primary/5 mint-:has-data-[state=checked]:border-primary mint-:dark:has-data-[state=checked]:bg-primary/10',
				className
			)}
			{...props}
		/>
	);
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='field-label'
			className={cn(
				'mint-:flex mint-:w-fit mint-:items-center mint-:gap-2 mint-:text-sm mint-:leading-snug mint-:font-medium mint-:group-data-[disabled=true]/field:opacity-50',
				className
			)}
			{...props}
		/>
	);
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			data-slot='field-description'
			className={cn(
				'mint-:text-muted-foreground mint-:text-sm mint-:leading-normal mint-:font-normal mint-:group-has-[[data-orientation=horizontal]]/field:text-balance',
				'mint-:last:mt-0 mint-:nth-last-2:-mt-1 mint-:[[data-variant=legend]+&]:-mt-1.5',
				'mint-:[&>a:hover]:text-primary mint-:[&>a]:underline mint-:[&>a]:underline-offset-4',
				className
			)}
			{...props}
		/>
	);
}

function FieldSeparator({
	children,
	className,
	...props
}: React.ComponentProps<'div'> & {
	children?: React.ReactNode;
}) {
	return (
		<div
			data-slot='field-separator'
			data-content={!!children}
			className={cn(
				'mint-:relative mint-:-my-2 mint-:h-5 mint-:text-sm mint-:group-data-[variant=outline]/field-group:-mb-2',
				className
			)}
			{...props}
		>
			<Separator className='mint-:absolute mint-:inset-0 mint-:top-1/2' />
			{children && (
				<span
					className='mint-:bg-background mint-:text-muted-foreground mint-:relative mint-:mx-auto mint-:block mint-:w-fit mint-:px-2'
					data-slot='field-separator-content'
				>
					{children}
				</span>
			)}
		</div>
	);
}

function FieldError({
	className,
	children,
	errors,
	...props
}: React.ComponentProps<'div'> & {
	errors?: Array<{ message?: string } | undefined>;
}) {
	const content = useMemo(() => {
		if (children) {
			return children;
		}

		if (!errors?.length) {
			return null;
		}

		const uniqueErrors = [
			...new Map(errors.map((error) => [error?.message, error])).values(),
		];

		if (uniqueErrors?.length == 1) {
			return uniqueErrors[0]?.message;
		}

		return (
			<ul className='mint-:ml-4 mint-:flex mint-:list-disc mint-:flex-col mint-:gap-1'>
				{uniqueErrors.map(
					(error, index) => error?.message && <li key={index}>{error.message}</li>
				)}
			</ul>
		);
	}, [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div
			role='alert'
			data-slot='field-error'
			className={cn(
				'mint-:text-destructive mint-:text-sm mint-:font-normal',
				className
			)}
			{...props}
		>
			{content}
		</div>
	);
}

export {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle,
};
