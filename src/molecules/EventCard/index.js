import styles from './EventCard.module.css';
import React, { useCallback } from 'react';

/**
 * @param {object} props
 * @param {number} props.id
 * @param {number} props.date unix timestamp in seconds
 * @param {'ERROR' | 'NOTICE'} props.type
 * @param {string} props.message
 * @param {(id: number) => void} props.onArchive
 * @returns
 */
export default function EventCard({ id, date, type, message, onArchive }) {
	const onArchiveHandler = useCallback(() => {
		if (typeof onArchive === 'function') {
			onArchive(id);
		}
	}, [id, onArchive]);

	return (
		<div className={styles.container + ' ' + styles[type.toLowerCase()]}>
			<div className={styles.header}>
				<time>{new Date(date * 1000).toLocaleDateString('nl-NL', {
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}</time>
				{typeof onArchive === 'function' && (
					<nav>
						<button onClick={onArchiveHandler}>Archive</button>
					</nav>
				)}
			</div>
			<div className={styles.body}>
				<p>{message}</p>
			</div>
		</div>
	);
}
