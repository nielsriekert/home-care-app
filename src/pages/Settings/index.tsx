import './Settings.module.css';

import SettingsTemplate from '../../templates/Settings';
import PageNav from '../../molecules/PageNav';

import FireIcon from '../../atoms/icons/FireIcon';
import PowerPlugIcon from '../../atoms/icons/PowerPlugIcon';
import SunIcon from '../../atoms/icons/SunIcon';
import WaterIcon from '../../atoms/icons/WaterIcon';
import CogwheelIcon from '../../atoms/icons/CogwheelIcon';

// TODO: should be just elements, not an array
export default function Settings() {
	return (
		<SettingsTemplate title="Settings" backButton={false}>
			<PageNav menuItems={[
				{
					icon: <FireIcon />,
					to: 'minder-gas-nl',
					label: 'MinderGas.nl',
					description: 'Monitor your natural gas consumption, by connecting to mindergas.nl'
				},
				{
					icon: <PowerPlugIcon />,
					to: 'smart-meter',
					label: 'Smart Meter',
					description: 'Show information about your smart meter and gas meter'
				},
				{
					icon: <SunIcon />,
					to: 'solar-inverters',
					label: 'Solar Inverters',
					description: 'Configure your solar inverters'
				},
				{
					icon: <WaterIcon />,
					to: 'water-reader',
					label: 'Water Reader',
					description: 'Add verified water readings to reset your meters reading'
				},
				{
					icon: <CogwheelIcon />,
					to: 'about',
					label: 'About',
					description: 'App and server version numbers'
				}
			]} />
		</SettingsTemplate>
	);
}