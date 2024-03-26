import styles from './SolarInverterCard.module.css';

import { FormattedNumber } from 'react-intl';

import SunIcon from '../../atoms/icons/SunIcon';

//@ts-ignore
import smaSunnyBoyImage from './sma-sunny-boy.png';
//@ts-ignore
import omnik4000Image from './omnik-4000.png';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql';

const SolarInverterCardFragment = graphql(`#graphql
	fragment SolarInverterCardFragment on SolarInverter {
		name
		url
		isOnline
		type
		currentPower
		totalYield
	}
`);

export default function SolarInverterCard({
	solarInverter,
} : {
	solarInverter: FragmentType<typeof SolarInverterCardFragment>,
}) {
	const { name, url, isOnline, type, currentPower, totalYield } = useFragment(SolarInverterCardFragment, solarInverter);

	const getImage = type => {
		switch (type) {
		case 'SMA_SUNNY_BOY':
			return <img src={smaSunnyBoyImage} alt="SMA Sunny Boy inverter" />;
		case 'OMNIK':
			return <img src={omnik4000Image} alt="Omnik 4000 inverter" />;
		default:
			return null;
		}
	};

	return (
		<div className={`${styles.container}${isOnline ? ` ${styles.isOnline}` : ''}`}>
			{!isOnline && <span className={styles.offlineLabel}>offline</span>}
			{getImage(type) && <div className={styles.image}>
				{getImage(type)}
			</div>}
			<h3>{name}</h3>
			<div className={styles.ipAddress}>{url}</div>
			{typeof currentPower === 'number' && <div className={styles.power}>Current: <FormattedNumber value={currentPower} /> W <SunIcon /></div>}
			{typeof totalYield === 'number' && <div className={styles.power}>Total: <FormattedNumber value={totalYield} /> kWh <SunIcon /></div>}
		</div>
	);
}
