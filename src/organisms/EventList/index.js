import styles from './EventList.module.css';
import React from 'react';

import { useQuery, gql } from '@apollo/client';

import EventCard from '../../molecules/EventCard';
import Message from '../../atoms/Message';
import Button from '../../atoms/Button';

import Skeleton from '../../atoms/Skeleton';

const EVENTS = gql`
	query events (
		$after: Int
		$pageSize: Int
	) {
		getEvents(after: $after pageSize: $pageSize) {
			cursor
			hasMore
    		eventResults {
      			date
      			type
      			message
    		}
		}
	}
`;

export default function EventList() {
	const { loading, error, data, fetchMore } = useQuery(EVENTS, {
		variables: {
			pageSize: 24
		}
	});

	return (
		<div className={styles.container}>
			{!loading && data?.getEvents?.eventResults && data.getEvents.eventResults.length > 0 ?
				<ul className={styles.cardsContainer}>
					{data.getEvents.eventResults.map(event => (
						<li key={event.id}><EventCard {...event} /></li>
					))}
				</ul>
				: loading ?
					<ul className={styles.cardsContainer}>
						<li>
							<Skeleton height="26px" width="100%" />
							<Skeleton height="32px" width="100%" />
						</li>
						<li>
							<Skeleton height="26px" width="100%" />
							<Skeleton height="32px" width="100%" />
						</li>
						<li>
							<Skeleton height="26px" width="100%" />
							<Skeleton height="32px" width="100%" />
						</li>
					</ul>
					: error ?
						<Message type="error">{error.message}</Message>	: <Message>No events found</Message>}
			{!loading && data?.getEvents && data.getEvents.hasMore && <div className={styles.cardsFooter}>
				<Button onClick={() => fetchMore({
					variables: {
						after: data.getEvents.cursor
					}
				})}>
					Load more
				</Button>
			</div>}
		</div>
	);
}
