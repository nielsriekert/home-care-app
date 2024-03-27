import styles from './Settings.module.css';

import Header from '../../organisms/Header';
import SettingsHeader from '../../molecules/SettingsHeader';

export default function Settings({ children, title = '', backButton = true }) {
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