import { Skeleton } from '@/components/ui/skeleton';

export const MintCardSkeleton = () => (
	<article className='mint-card'>
		<div className='mint-card__media-wrapper'>
			<Skeleton className='mint-card__media-img' />
		</div>
		<div className='mint-card__meta'>
			<div className='mint-card__meta-header'>
				<Skeleton className='h-6 w-3/4' />
			</div>
			<div className='mint-card__meta-content'>
				<Skeleton className='h-4 w-1/2 mb-1' />
				<Skeleton className='h-4 w-2/3' />
			</div>
		</div>
	</article>
);
