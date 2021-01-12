import styles from './EventCard.module.css';
import React from 'react';

function EventCard({ date, type, message }) {
	return (
		<div className={styles.container + ' ' + styles[type]}>
			<div className={styles.header}>
				<time>{date}</time>
			</div>
			<div className={styles.body}>
				<p>{message}</p>
			</div>
		</div>
	);
}

export default EventCard;