import styles from './FieldDescription.module.css';
import React from 'react';

export default function FieldDescription({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
