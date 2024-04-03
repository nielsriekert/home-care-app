import styles from './Settings.module.css';
import { ReactNode } from 'react';

import Header from '../../organisms/Header';
import SettingsHeader from '../../molecules/SettingsHeader';

export default function Settings({
	children,
	title = '',
	backButton = true,
}: {
	children: ReactNode,
	title: string,
	backButton?: boolean,
}) {
	return (
		<div className={styles.default}>
			<Header title="Home Care" />
			<SettingsHeader title={title} backButton={backButton} />
			<main className={styles.pageContainer}>
				{children}
			</main>
		</div>
	);
};