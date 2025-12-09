import { dropContracts } from '@/config/contracts';

export type ContractFilterProps = {
	value: string;
	onChange: (value: string) => void;
};

export const ContractFilter = ({ value, onChange }: ContractFilterProps) => {
	if (!dropContracts.length) return null;
	const options =
		dropContracts.length > 1
			? ['all', ...dropContracts.map((contract) => contract.slug)]
			: dropContracts.map((contract) => contract.slug);
	const getLabel = (key: string) => {
		if (key === 'all') return 'All Drops';
		return (
			dropContracts.find((contract) => contract.slug === key)?.label ??
			key
		);
	};

	return (
		<div className='flex flex-wrap items-center justify-center gap-3 px-5 py-4'>
			{options.map((key) => (
				<button
					key={key}
					type='button'
					onClick={() => onChange(key)}
					className={`rounded-full mint-border px-5 py-2 text-sm uppercase tracking-[0.2em] transition ${
						value === key
							? 'mint-alt2-border mint-muted-text'
							: 'mint-border mint-muted-text'
					}`}
				>
					{getLabel(key)}
				</button>
			))}
		</div>
	);
};
