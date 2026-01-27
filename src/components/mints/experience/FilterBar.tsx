'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dropContracts } from '@/config/contracts';
import { analytics } from '@/lib/analytics';
import { Filter, SortAsc } from 'lucide-react';
import { useState } from 'react';

export type FilterBarProps = {
	selectedContract: string;
	sortBy: 'date' | 'name';
	onContractChangeAction: (contract: string) => void;
	onSortChangeAction: (sort: 'date' | 'name') => void;
};

export const FilterBar = ({
	selectedContract,
	sortBy,
	onContractChangeAction,
	onSortChangeAction,
}: FilterBarProps) => {
	const [showFilters, setShowFilters] = useState(false);
	const [showSort, setShowSort] = useState(false);

	const hasMultipleContracts = dropContracts.length > 1;

	const contractOptions =
		dropContracts.length > 1
			? ['all', ...dropContracts.map((c) => c.slug)]
			: dropContracts.map((c) => c.slug);

	const getContractLabel = (slug: string) => {
		if (slug === 'all') return 'All Collections';
		return dropContracts.find((c) => c.slug === slug)?.label ?? slug;
	};

	const getSortLabel = (sort: 'date' | 'name') => {
		return sort === 'date' ? 'Date Added' : 'Alphabetical';
	};

	return (
		<div className='filter-bar'>
			{hasMultipleContracts && (
				<div className='filter-wrapper'>
					<Button
						type='button'
						variant='ghost'
						onClick={() => {
							setShowFilters(!showFilters);
							setShowSort(false);
						}}
						className='filter-button'
					>
						<Filter className='h-3 w-3' />
						<span className='hidden sm:inline'>Filters</span>
					</Button>

					{showFilters && (
						<>
							<div
								className='fixed inset-0 z-40'
								onClick={() => setShowFilters(false)}
							/>
							<div className='mint-filter-dropdown absolute top-full left-0 z-50 mt-2 w-56 overflow-hidden'>
								<div className='filter-dropdown-header'>
									<h4>Collections</h4>
								</div>
								<Separator className='mint-border' />
								<div className='filter-dropdown-content'>
									{contractOptions.map((slug) => (
										<Button
											key={slug}
											type='button'
											variant='ghost'
											onClick={() => {
												onContractChangeAction(slug);
												setShowFilters(false);
												analytics.filterChange(slug);
											}}
											className={`filter-dropdown-button ${
												selectedContract === slug
													? 'filter-dropdown-button-active mint-gradient-text'
													: 'filter-dropdown-button-inactive'
											}`}
										>
											{getContractLabel(slug)}
										</Button>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			)}

			{!hasMultipleContracts && <div />}

			<div className='sort-wrapper'>
				<Button
					type='button'
					variant='ghost'
					onClick={() => {
						setShowSort(!showSort);
						setShowFilters(false);
					}}
					className='filter-button'
				>
					<span className='hidden sm:inline'>Sort</span>
					<SortAsc className='h-3 w-3' />
				</Button>

				{showSort && (
					<>
						<div
							className='fixed inset-0 z-40'
							onClick={() => setShowSort(false)}
						/>
						<div className='mint-filter-dropdown absolute top-full right-0 z-50 mt-2 w-48 overflow-hidden'>
							<div className='filter-dropdown-header'>
								<h4>Sort By</h4>
							</div>
							<Separator className='mint-border' />
							<div className='filter-dropdown-content'>
								{(['date', 'name'] as const).map((sort) => (
									<Button
										key={sort}
										type='button'
										variant='ghost'
										onClick={() => {
											onSortChangeAction(sort);
											setShowSort(false);
											analytics.sortChange(sort);
										}}
										className={`filter-dropdown-button ${
											sortBy === sort
												? 'filter-dropdown-button-active mint-gradient-text'
												: 'filter-dropdown-button-inactive'
										}`}
									>
										{getSortLabel(sort)}
									</Button>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
