import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { IntlProvider } from 'react-intl';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import Loading from './pages/Loading';
import Login from './pages/Login';
import Portal from './pages/Portal';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ProfileDashboard from './pages/ProfileDashboard';
import MinderGasNlSettings from './pages/MinderGasNlSettings';
import SmartMeterSettings from './pages/SmartMeterSettings';
import SolarInvertersSettings from './pages/SolarInvertersSettings';
import WaterReaderSettings from './pages/WaterReaderSettings';
import About from './pages/About';
import FourOFour from './pages/FourOFour';

const INIT = gql`
	query init {
		isLoggedIn
		hasSolarInverters
	}
`;

export default function App() {
	const { data, loading } = useQuery(INIT);

	return (
		<IntlProvider locale={navigator.language}>
			{loading ?
				<Loading /> :
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route exact path="/" element={data && data.isLoggedIn ? <Dashboard hasSolarInverts={data.hasSolarInverters}/> : <Portal />} />
						<Route path="/profile" element={<ProfileDashboard />} />
						<Route path="settings" element={<Settings />} />
						<Route path="/settings/minder-gas-nl" element={<MinderGasNlSettings />} />
						<Route path="/settings/smart-meter" element={<SmartMeterSettings />} />
						<Route path="/settings/solar-inverters" element={<SolarInvertersSettings />} />
						<Route path="/settings/water-reader" element={<WaterReaderSettings />} />
						<Route path="/settings/about" element={<About />} />
						<Route element={<FourOFour />} />
					</Routes>
				</Router>}
		</IntlProvider>
	);
}
