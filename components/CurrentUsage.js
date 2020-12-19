import styles from '../styles/Home.module.css';
import React from 'react';

function CurrentUsage({ currentElectricityUsage }) {
	return (
		<div className={styles['current-usage']}>
			Current Electric Usage: {currentElectricityUsage} kW (refresh page to refresh)
		</div>
	);
}

export default CurrentUsage;