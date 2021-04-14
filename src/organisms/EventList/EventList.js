import styles from './EventList.module.css';
import React, { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client';

import EventCard from '../../molecules/EventCard/EventCard';
import Message from '../../atoms/Message/Message';

import Skeleton from '../../atoms/Skeleton/Skeleton';

const EVENTS = gql`
	query events (
		$after: Int
		$pageSize: Int
	) {
		getEvents(after: $after pageSize: $pageSize) {
    		eventResults {
      			date
      			type
      			message
    		}
		}
	}
`;

export default function EventList() {
	const [events, setEvents] = useState([]);
	const { loading, error, data } = useQuery(EVENTS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			pageSize: 24
		}
	});

	useEffect(() => {
		if (!data) {
			return;
		}
		setEvents(data.getEvents.eventResults.map(event => ({
			...event,
			type: event.type.toLowerCase(),
			timeStamp: event.date,
			date: new Date(event.date * 1000).toLocaleDateString('nl-NL', {
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
			})
		})));
	}, [data]);

	return (
		<div className={styles.container}>
			{!loading && events.length > 0 ?
				<ul className={styles.cardsContainer}>
					{events.map(event => (
						<li><EventCard key={event.timeStamp} {...event} /></li>
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
						<Message type="error">{error}</Message>	: <Message>No events found</Message>}
		</div>
	);
}