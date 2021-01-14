import React from 'react';
import './ProfileDashboard.module.css';

import Default from '../../templates/Default/Default';

import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';

import EventList from '../../components/EventList/EventList';

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