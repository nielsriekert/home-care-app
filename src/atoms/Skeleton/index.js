import React from 'react';
import styles from './Skeleton.module.css';

/**
 * @param {object} props
 * @param {*=} props.children
 * @param {string} [props.height=1em]
 * @param {string} [props.width=10em]
 * @param {string} [props.shape=rectangle]
 * @returns
 */
export default function Skeleton({ children, height = '1em', width = '10em', shape = 'rectangle' }) {
	return (
		<span className={styles.container + (styles[shape] ? ' ' + styles[shape] : '')} style={{ height, width }}>
			{children}
		</span>
	);
}