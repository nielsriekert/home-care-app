import React from 'react';
import styles from './WidgetGrid.module.css';

export default function WidgetGrid({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
