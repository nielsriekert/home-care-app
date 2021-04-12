import React from 'react';
import './Settings.module.css';

import Default from '../../templates/Default/Default';
import PageNav from '../../molecules/PageNav/PageNav';

import FireIcon from '../../atoms/FireIcon/FireIcon';

export default function Settings() {
	return (
		<Default>
			<h1>Settings</h1>
			<PageNav menuItems={[
				{
					icon: FireIcon,
					to: '/minder-gas-nl',
					label: 'MinderGas.nl',
					description: 'Monitor your natural gas consumption, by connecting to mindergas.nl'
				}
			]} />
		</Default>
	);
}