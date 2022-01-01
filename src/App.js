import React from 'react';

import { IntlProvider } from 'react-intl';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ProfileDashboard from './pages/ProfileDashboard';
import MinderGasNlSettings from './pages/MinderGasNlSettings';
import SmartMeterSettings from './pages/SmartMeterSettings';
import WaterReaderSettings from './pages/WaterReaderSettings';
import About from './pages/About';
import FourOFour from './pages/FourOFour';

export default function App() {
	return (
		<IntlProvider locale={navigator.language}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route exact path="/" element={<Dashboard />} />
					<Route path="/profile" element={<ProfileDashboard />} />
					<Route path="settings" element={<Settings />} />
					<Route path="/settings/minder-gas-nl" element={<MinderGasNlSettings />} />
					<Route path="/settings/smart-meter" element={<SmartMeterSettings />} />
					<Route path="/settings/water-reader" element={<WaterReaderSettings />} />
					<Route path="/settings/about" element={<About />} />
					<Route element={<FourOFour />} />
				</Routes>
			</Router>
		</IntlProvider>
	);
}
