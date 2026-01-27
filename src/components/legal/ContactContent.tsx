'use client';

import {
	xProfileLink,
	farcasterProfileLink,
	baseAppProfileLink,
	openseaCollectionLink,
	thirdwebContractLink,
} from '@/components/mints/experience/constants';
import { Button } from '@/components/ui/button';
import {
	Mail,
	MessageSquare,
	ExternalLink,
	X,
	Hash,
	Globe,
	FileText,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Mode = 'page' | 'overlay';

type SectionProps = {
	children: ReactNode;
};

const Section = ({ children }: SectionProps) => (
	<section className='legal-section'>{children}</section>
);

type ContactContentProps = {
	mode?: Mode;
};

export const ContactContent = ({ mode = 'page' }: ContactContentProps) => {
	return (
		<article className='legal-article'>
			<header
				className={`text-center ${mode === 'page' ? 'mb-8' : 'mb-4'} mint-gradient-text`}
			>
				<h1 className='legal-h1'>Get in Touch</h1>
				<section className='legal-separator mint-border border'></section>
				<p className='legal-p'>
					Connect with BEDLAM520nft through our social channels or reach out for
					support.
				</p>
				<section className='legal-separator mint-border border'></section>
			</header>

			<Section>
				<h2 className='legal-h2'>Connect With Us</h2>
				<div className='mint-activity-panel-wrapper'>
					<div className='grid gap-4 sm:grid-cols-2'>
						{/* X/Twitter */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<Twitter className='h-5 w-5' />
								<h3 className='font-semibold'>X (Twitter)</h3>
							</div>
							<p className='legal-p text-sm'>Follow for updates and announcements</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href={xProfileLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									@bedlam520
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>

						{/* Farcaster */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<Hash className='h-5 w-5' />
								<h3 className='font-semibold'>Farcaster</h3>
							</div>
							<p className='legal-p text-sm'>Join the conversation on Farcaster</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href={farcasterProfileLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									bedlam520.eth
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>

						{/* Base App */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<Globe className='h-5 w-5' />
								<h3 className='font-semibold'>Base</h3>
							</div>
							<p className='legal-p text-sm'>Connect on Base network</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href={baseAppProfileLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									bedlam520.eth
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>

						{/* OpenSea */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<FileText className='h-5 w-5' />
								<h3 className='font-semibold'>OpenSea</h3>
							</div>
							<p className='legal-p text-sm'>View our NFT collection</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href={openseaCollectionLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									Collection
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>

						{/* Thirdweb Contract */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<FileText className='h-5 w-5' />
								<h3 className='font-semibold'>Smart Contract</h3>
							</div>
							<p className='legal-p text-sm'>View verified contract on Thirdweb</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href={thirdwebContractLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									View Contract
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>

						{/* Direct Message */}
						<div className='space-y-3'>
							<div className='mint-gradient-text flex items-center gap-2'>
								<MessageSquare className='h-5 w-5' />
								<h3 className='font-semibold'>Direct Message</h3>
							</div>
							<p className='legal-p text-sm'>DM us on X for quick support</p>
							<Button
								asChild
								variant='outline'
								className='w-full'
							>
								<Link
									href='https://x.com/messages/compose?recipient_id=bedlam520'
									target='_blank'
									rel='noopener noreferrer'
								>
									Send DM
									<ExternalLink className='ml-2 h-4 w-4' />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</Section>

			<Section>
				<h2 className='legal-h2'>Support & Resources</h2>
				<div className='mint-activity-panel-wrapper space-y-4'>
					<div className='mint-gradient-text flex items-center gap-2'>
						<Mail className='h-5 w-5' />
						<h3 className='font-semibold'>Need Help?</h3>
					</div>

					<div className='space-y-2'>
						<p className='legal-p'>
							For general inquiries, technical support, or questions about your mints,
							please reach out through:
						</p>
						<ul className='ml-4 space-y-2'>
							<li className='legal-p flex items-start gap-2'>
								<span className='text-primary'>•</span>
								<span>
									<strong>X/Twitter DMs:</strong> Fastest response time for urgent
									matters
								</span>
							</li>
							<li className='legal-p flex items-start gap-2'>
								<span className='text-primary'>•</span>
								<span>
									<strong>Farcaster:</strong> Join community discussions and get help
									from other collectors
								</span>
							</li>
							<li className='legal-p flex items-start gap-2'>
								<span className='text-primary'>•</span>
								<span>
									<strong>Base App:</strong> Connect with us on-chain for Base-related
									questions
								</span>
							</li>
						</ul>
					</div>

					<section className='legal-separator mint-border border'></section>

					<div className='space-y-2'>
						<h4 className='mint-gradient-text font-semibold'>Before reaching out:</h4>
						<ul className='legal-p ml-4 space-y-1'>
							<li className='flex items-start gap-2'>
								<span className='text-primary'>1.</span>
								<span>
									Check our{' '}
									<Link
										href='/terms'
										className='text-primary hover:underline'
									>
										Terms of Service
									</Link>{' '}
									for usage policies
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-primary'>2.</span>
								<span>
									Review our{' '}
									<Link
										href='/privacy'
										className='text-primary hover:underline'
									>
										Privacy Policy
									</Link>{' '}
									for data handling information
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='text-primary'>3.</span>
								<span>
									Read the{' '}
									<Link
										href='/data-policy'
										className='text-primary hover:underline'
									>
										Data Policy
									</Link>{' '}
									for detailed data practices
								</span>
							</li>
						</ul>
					</div>
				</div>
			</Section>

			<Section>
				<h2 className='legal-h2'>Response Times</h2>
				<div className='mint-activity-panel-wrapper space-y-3'>
					<div className='mint-gradient-text flex items-center gap-2'>
						<MessageSquare className='h-4 w-4' />
						<h3 className='text-sm font-semibold'>What to Expect</h3>
					</div>
					<p className='legal-p'>
						We aim to respond to all inquiries within 24-48 hours during business days.
						For urgent technical issues affecting your mints or wallet, please mention
						&quot;URGENT&quot; in your message subject.
					</p>
					<p className='legal-p'>
						Please note that blockchain transactions are immutable. For
						transaction-related questions, include your wallet address and transaction
						hash for faster assistance.
					</p>
				</div>
			</Section>

			<Section>
				<section className='legal-separator mint-border border'></section>
				<div className='space-y-4 pt-4 text-center'>
					<p className='legal-p'>
						Looking for legal information? Visit our{' '}
						<Link
							href='/terms'
							className='text-primary hover:underline'
						>
							Terms
						</Link>
						,{' '}
						<Link
							href='/privacy'
							className='text-primary hover:underline'
						>
							Privacy Policy
						</Link>
						, or{' '}
						<Link
							href='/data-policy'
							className='text-primary hover:underline'
						>
							Data Handling Policy
						</Link>
						.
					</p>
					<Button
						asChild
						variant='outline'
					>
						<Link href='/'>← Back to Mints</Link>
					</Button>
				</div>
			</Section>
		</article>
	);
};
