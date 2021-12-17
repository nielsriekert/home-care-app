import styles from './FieldDescription.module.css';
import React from 'react';

export default function FieldDescription({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
