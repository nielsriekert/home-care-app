import styles from './EventCard.module.css';
import { useCallback } from 'react';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql';

const EventCardFragment = graphql(`#graphql
	fragment EventCardFragment on Event {
		id
		type
		date
		message
	}
`);

export default function EventCard({
	event,
	onArchive
} : {
	event: FragmentType<typeof EventCardFragment>,
	onArchive: (id: string)  => void,
}) {
	const { id, type, date, message } = useFragment(EventCardFragment, event);

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
