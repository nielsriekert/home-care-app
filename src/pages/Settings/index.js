import React from 'react';
import './Settings.module.css';

import SettingsTemplate from '../../templates/Settings/Settings';
import PageNav from '../../molecules/PageNav/PageNav';

import FireIcon from '../../atoms/FireIcon/FireIcon';
import PowerPlugIcon from '../../atoms/PowerPlugIcon/PowerPlugIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';
import CogwheelIcon from '../../atoms/CogwheelIcon/CogwheelIcon';

export default function Settings() {
	return (
		<SettingsTemplate title="Settings" backButton={false}>
			<PageNav menuItems={[
				{
					icon: FireIcon,
					to: '/minder-gas-nl',
					label: 'MinderGas.nl',
					description: 'Monitor your natural gas consumption, by connecting to mindergas.nl'
				},
				{
					icon: PowerPlugIcon,
					to: '/smart-meter',
					label: 'Smart Meter',
					description: 'Show information about your smart meter and gas meter'
				},
				{
					icon: WaterIcon,
					to: '/water-reader',
					label: 'Water Reader',
					description: 'Add verified water readings to reset your meters reading'
				},
				{
					icon: CogwheelIcon,
					to: '/about',
					label: 'About',
					description: 'App and server version numbers'
				}
			]} />
		</SettingsTemplate>
	);
}