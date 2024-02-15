import styles from './LoadingSpinner.module.css';
import React from 'react';

export default function LoadingSpinner({
	children,
	diameter = '20px',
	borderWidth = '4px',
	isHidden = false,
}: {
	children?: React.ReactNode
	diameter?: (string & {}) | number,
	borderWidth?: (string & {}) | number,
	isHidden?: boolean
}) {
	return (
		<div className={`${styles.container}${isHidden ? ` ${styles.isHidden}` : ''}`} style={{ width: diameter, height: diameter, borderWidth }}>
			{children}
		</div>
	);
}