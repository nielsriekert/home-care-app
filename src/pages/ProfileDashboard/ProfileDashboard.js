import './profile-dashboard.css';
import React from 'react';

import Header from '../../components/Header/Header';

import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';

import EventList from '../../components/EventList/EventList';

function Dashboard() {
	return (
		<div className="App">
			<Header />
			<main className="page-container">
				<ProfileNavigation />
				<h1>Profile</h1>
				<EventList />
			</main>
		</div>
	);
}

export default Dashboard;