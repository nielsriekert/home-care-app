import Default from '../../templates/Default';

import ProfileNavigation from '../../molecules/ProfileNavigation';

import ProfileSettingGroups from '../../organisms/ProfileSettingGroups';

export default function Dashboard() {
	return (
		<Default>
			<ProfileNavigation />
			<h1>Profile</h1>
			<ProfileSettingGroups />
		</Default>
	);
}
