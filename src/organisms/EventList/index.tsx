import { useCallback, useEffect } from 'react';
import styles from './EventList.module.css';

import { useQuery, useMutation, NetworkStatus } from '@apollo/client';

import { useSearchParams } from 'react-router-dom';

import Alert from '../../atoms/Alert';

import EventCard from '../../molecules/EventCard';
import Paging from '../../molecules/Paging';

import Skeleton from '../../atoms/Skeleton';

import { graphql } from '../../types/graphql';

const Events_Query = graphql(`#graphql
	query events (
		$after: String
		$before: String
	) {
		events(after: $after before: $before) {
			totalCount
    		edges {
				node {
					id
					...EventCardFragment
				}
			}
			...PagingFragment
		}
	}
`);

const ArchiveEvent_Mutation = graphql(`#graphql
	mutation archiveEvent($id: ID!) {
		archiveEvent(id: $id) {
			...EventCardFragment
		}
	}
`);

export default function EventList() {
	const [searchParams] = useSearchParams();
	const after = searchParams.get('after');
	const before = searchParams.get('before');

	const { error, data, called, fetchMore, networkStatus } = useQuery(Events_Query, {
		variables: {
			after,
			before
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-and-network',
    	nextFetchPolicy: 'cache-first',
	});

	const [archiveEvent] = useMutation(ArchiveEvent_Mutation, {
		refetchQueries: [Events_Query]
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

	const onArchive = useCallback((id: string) => {
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
				connection={data.events}
			/>}
			{data?.events?.edges &&
				<ul className={`${styles.cardsContainer}${NetworkStatus[networkStatus] === 'refetch'  ? ` ${styles.isRefetching}` : ''}`}>
					{data.events.edges.map(edge => (
						<li key={edge.node.id}>
							<EventCard
								event={edge.node}
								onArchive={onArchive}
							/>
						</li>
					))}
				</ul>}
			{NetworkStatus[networkStatus] !== 'ready' && NetworkStatus[networkStatus] !== 'refetch' &&
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
			{error && <Alert severity="error">{error.message}</Alert>}
			{data?.events?.totalCount === 0 && <Alert>No events found</Alert>}
			{data && <Paging
				currentCount={data?.events.edges.length || 0}
				connection={data.events}
			/>}
		</div>
	);
}
