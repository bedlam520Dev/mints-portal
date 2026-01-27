'use client';

import { useProfileOverlay } from '@/components/profile/ProfileOverlayProvider';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BedlamConnectButton } from '@/components/wallet/BedlamConnectButton';
import { Menu, Mail, User, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { logoImage } from './constants';

export const HeaderBar = () => {
	const { openProfile } = useProfileOverlay();
	const { setTheme } = useTheme();

	return (
		<header className='mint-header'>
			<div className='mint-header__inner'>
				<Image
					src={logoImage}
					alt='BEDLAM520nft'
					width={1024}
					height={1024}
					priority
					className='nav-logo'
				/>
				<div className='mint-header__controls'>
					<BedlamConnectButton />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								type='button'
								variant='ghost'
								className='profile-badge'
								aria-label='Open menu'
							>
								<Menu className='h-5 w-5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='mint-filter-dropdown w-48 overflow-hidden'
						>
							<div className='filter-dropdown-header'>
								<h4>Menu</h4>
							</div>
							<div className='mint-border h-px' />
							<div className='filter-dropdown-content'>
								<DropdownMenuItem asChild>
									<Link
										href='/contact'
										className='filter-dropdown-button filter-dropdown-button-inactive flex items-center gap-2'
									>
										<Mail className='h-4 w-4' />
										<span>Contact</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={openProfile}
									className='filter-dropdown-button filter-dropdown-button-inactive flex items-center gap-2 cursor-pointer'
								>
									<User className='h-4 w-4' />
									<span>Profile</span>
								</DropdownMenuItem>
								<div className='mint-border h-px my-2' />
								<DropdownMenuItem
									onClick={() => setTheme('light')}
									className='filter-dropdown-button filter-dropdown-button-inactive flex items-center gap-2 cursor-pointer'
								>
									<Sun className='h-4 w-4' />
									<span>Light</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme('dark')}
									className='filter-dropdown-button filter-dropdown-button-inactive flex items-center gap-2 cursor-pointer'
								>
									<Moon className='h-4 w-4' />
									<span>Dark</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme('system')}
									className='filter-dropdown-button filter-dropdown-button-inactive flex items-center gap-2 cursor-pointer'
								>
									<Monitor className='h-4 w-4' />
									<span>System</span>
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};
