import React from 'react';
import './ProfileDashboard.module.css';

import Default from '../../templates/Default/Default';

import ProfileNavigation from '../../molecules/ProfileNavigation/ProfileNavigation';

import EventList from '../../organisms/EventList/EventList';

function Dashboard() {
	return (
		<Default>
			<ProfileNavigation />
			<h1>Profile</h1>
			<EventList />
		</Default>
	);
}

export default Dashboard;