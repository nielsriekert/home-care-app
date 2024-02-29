import React from 'react';
import styles from './SolarInverterCard.module.css';

import { FormattedNumber } from 'react-intl';

import SunIcon from '../../atoms/icons/SunIcon';

import smaSunnyBoyImage from './sma-sunny-boy.png';
import omnik4000Image from './omnik-4000.png';

export default function SolarInverterCard({ name, ipAddress, isOnline, type, currentPower = null, totalYield = null }) {
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
			<div className={styles.ipAddress}>{ipAddress}</div>
			{typeof currentPower === 'number' && <div className={styles.power}>Current: <FormattedNumber value={currentPower} /> W <SunIcon /></div>}
			{typeof totalYield === 'number' && <div className={styles.power}>Total: <FormattedNumber value={totalYield} /> kWh <SunIcon /></div>}
		</div>
	);
}
