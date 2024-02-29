import styles from './Skeleton.module.css';
import React from 'react';

export default function Skeleton({
	children,
	height = '1.125em',
	width = '10em',
	shape = 'rectangle',
	display = 'inline-block'
}: {
	children?: React.ReactNode,
	height?: string | number,
	width?: string | number,
	shape?: 'rectangle' | 'circle',
	display?: React.CSSProperties['display']
}) {
	return (
		<span className={styles.container + (styles[shape] ? ' ' + styles[shape] : '')} style={{ height, width, display }}>
			{children}
		</span>
	);
}