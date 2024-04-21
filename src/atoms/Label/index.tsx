import styles from './Label.module.css';
import React from 'react';

import SunIcon from '../icons/SunIcon';
import BoltIcon from '../icons/BoltIcon';
import FireIcon from '../icons/FireIcon';

const icons = {
	solar: <SunIcon />,
	electricity: <BoltIcon />,
	gas: <FireIcon />,
};

export type Type = 'solar' | 'electricity' | 'gas';

export default function Label({
	children,
	type,
	title,
}: {
	children: React.ReactNode,
	type: Type,
	title?: string,
}) {
	return (
		<div className={`${styles.container}${styles[type] ? ` ${styles[type]}` : ''}`} title={title}>
			<div>
				{children}
			</div>
			<div className={styles.icon}>
				{icons[type]}
			</div>
		</div>
	);
}