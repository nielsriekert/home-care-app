import React from 'react';
import styles from './Skeleton.module.css';

export default function Skeleton({ children, height = '1.5em', width = '10em' }) {
	return (
		<span className={styles.container} style={{ height, width }}>
			{children}
		</span>
	);
}