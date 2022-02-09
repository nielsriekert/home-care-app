import styles from './EventCard.module.css';
import React from 'react';

export default function EventCard({ date, type, message }) {
	return (
		<div className={styles.container + ' ' + styles[type.toLowerCase()]}>
			<div className={styles.header}>
				<time>{new Date(date * 1000).toLocaleDateString('nl-NL', {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}</time>
			</div>
			<div className={styles.body}>
				<p>{message}</p>
			</div>
		</div>
	);
}
