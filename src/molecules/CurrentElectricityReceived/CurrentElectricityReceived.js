import React from 'react';
import styles from './CurrentElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

const CURRENT_ELECTRIC_RECEIVED = gql`
	query currentElectricityReceived {
		currentElectricityUsage {
			received(unit: WATT),
			readingAt
		}
	}
`;

export default function CurrentElectricityReceived() {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_RECEIVED, {
		fetchPolicy: 'network-only',
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data.currentElectricityUsage ? data.currentElectricityUsage.received + ' W' : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
