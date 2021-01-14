import React from 'react';
import styles from './Message.module.css';

export default function Message({ type, children }) {
	return (
		<div className={styles.container + (type ? ' ' + styles[type] : ' ' + styles.notice)} >
			{children}
		</div>
	);
}
