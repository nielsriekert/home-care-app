import React from 'react';
import styles from './Settings.module.css';

import Header from '../../organisms/Header';
import SettingsHeader from '../../molecules/SettingsHeader/SettingsHeader';

export default function Default({ children, title = '', backButton = true }) {
	return (
		<div className={styles.default}>
			<Header />
			<SettingsHeader title={title} backButton={backButton} />
			<main className={styles.pageContainer}>
				{children}
			</main>
		</div>
	);
};