import { PROFILE_LINKS } from '@/components/mints/experience/constants';
import { ProfileButton } from '@/components/profile/ProfileButton';

export const ProfileCTA = () => (
	<div className='mint-profile-bar'>
		{PROFILE_LINKS.map((profile) => (
			<ProfileButton
				key={profile.id}
				label={profile.label}
				href={profile.href}
				icon={profile.icon}
			/>
		))}
	</div>
);
