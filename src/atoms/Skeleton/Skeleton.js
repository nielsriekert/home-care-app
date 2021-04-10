import React from 'react';
import styles from './Skeleton.module.css';

export default function Skeleton({ children, height = '1.5em', width = '10em', shape = 'rectangle' }) {
	return (
		<span className={styles.container + (styles[shape] ? ' ' + styles[shape] : '')} style={{ height, width }}>
			{children}
		</span>
	);
}