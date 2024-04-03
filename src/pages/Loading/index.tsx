import styles from  './Loading.module.css';

import LoggedOut from '../../templates/LoggedOut';

import BoltIcon from '../../atoms/icons/BoltIcon';
import FireIcon from '../../atoms/icons/FireIcon';
import SunIcon from '../../atoms/icons/SunIcon';

export default function Loading() {
	const random = Math.random() * 3;
	return (
		<LoggedOut>
			<div className={styles.loaderContainer}>
				<div className={styles.iconContainer} />
			</div>
			<div className={styles.loaderContainer}>
				{random < 1 ? <BoltIcon /> : random < 2 ? <FireIcon /> : <SunIcon />}
			</div>
		</LoggedOut>
	);
}
