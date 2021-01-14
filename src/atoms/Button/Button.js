import styles from './Button.module.css';
import React from 'react';

export default function Button({ children, type, onClick }) {
	return (
		<button className={styles.button + (type ? ' ' + styles[type] : '')} onClick={onClick}>{children}</button>
	);
}
