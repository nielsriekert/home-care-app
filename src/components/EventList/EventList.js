import styles from './EventList.module.css';
import React, { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client';

import EventCard from '../EventCard/EventCard';
import Message from '../../atoms/Message/Message';

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

function EventList() {
	const [events, setEvents] = useState([]);
	const { data } = useQuery(EVENTS, {
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
			{events.length > 0 ?
				<div>
					<ul className={styles.cardsContainer}>
						{events.map(event => (
							<EventCard key={event.timeStamp} {...event} />
						))}
					</ul>
				</div> : <Message>No events found</Message>}
		</div>
	);
}

export default EventList;