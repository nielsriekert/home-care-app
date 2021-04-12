import React from 'react';
import './Settings.module.css';

import SettingsTemplate from '../../templates/Settings/Settings';
import PageNav from '../../molecules/PageNav/PageNav';

import FireIcon from '../../atoms/FireIcon/FireIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';

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
					icon: WaterIcon,
					to: '/water-reader',
					label: 'Water Reader',
					description: 'Add verified water readings to reset your meters reading'
				}
			]} />
		</SettingsTemplate>
	);
}