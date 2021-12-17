import React from 'react';
import './ProfileDashboard.module.css';

import Default from '../../templates/Default';

import ProfileNavigation from '../../molecules/ProfileNavigation';

import EventList from '../../organisms/EventList';

export default function Dashboard() {
	return (
		<Default>
			<ProfileNavigation />
			<h1>Profile</h1>
			<EventList />
		</Default>
	);
}
