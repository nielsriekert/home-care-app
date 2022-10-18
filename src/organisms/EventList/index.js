// @ts-check
import React, { useCallback, useEffect } from 'react';
import styles from './EventList.module.css';

import { gql, useQuery, useMutation } from '@apollo/client';

import { useSearchParams } from 'react-router-dom';

import Message from '../../atoms/Message';

import EventCard from '../../molecules/EventCard';
import Paging from '../../molecules/Paging';

import Skeleton from '../../atoms/Skeleton';

import { EVENT } from '../../fragments';

const EVENTS = gql`
	${EVENT}
	query events (
		$after: String
		$before: String
	) {
		events(after: $after before: $before) {
			totalCount
    		edges {
				node {
					...EventFields
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;

const ARCHIVE_EVENT = gql`
	${EVENT}
	mutation archiveEvent($id: ID!) {
		archiveEvent(id: $id) {
			...EventFields
		}
	}
`;

export default function EventList() {
	const [searchParams] = useSearchParams();
	const after = searchParams.get('after');
	const before = searchParams.get('before');

	const { loading, error, data, called, fetchMore } = useQuery(EVENTS, {
		variables: {
			after,
			before
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-and-network',
    	nextFetchPolicy: 'cache-first',
	});

	const [archiveEvent] = useMutation(ARCHIVE_EVENT, {
		refetchQueries: [EVENTS]
	});

	useEffect(() => {
		if (!called) {
			return;
		}

		if (typeof fetchMore !== 'function') {
			return;
		}

		fetchMore({
			variables: {
				after,
				before
			}
		});
	}, [called, after, before, fetchMore]);

	const onArchive = useCallback((id) => {
		archiveEvent({
			variables: {
				id
			}
		});
	}, [archiveEvent]);

	return (
		<div className={styles.container}>
			{data && <Paging
				currentCount={data?.events.edges.length || 0}
				totalCount={data.events.totalCount}
				pageInfo={data.events.pageInfo}
			/>}
			{data?.events?.edges &&
				<ul className={styles.cardsContainer}>
					{data.events.edges.map(edge => (
						<li key={edge.node.id}>
							<EventCard
								{...edge.node}
								onArchive={onArchive}

							/>
						</li>
					))}
				</ul>}
			{loading &&
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
				</ul>}
			{error && <Message type="error">{error.message}</Message>}
			{data?.events?.totalCount === 0 && <Message>No events found</Message>}
			{data && <Paging
				currentCount={data?.events.edges.length || 0}
				totalCount={data.events.totalCount}
				pageInfo={data.events.pageInfo}
			/>}
		</div>
	);
}
