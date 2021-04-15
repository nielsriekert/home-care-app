import React from 'react';
import styles from './CurrentElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';

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
		fetchPolicy: 'cache-and-network',
	});

	if (error) return <p>Error :(</p>;
	return (
		<div className={styles.container}>
			{!loading ? data.currentElectricityUsage ? data.currentElectricityUsage.received + ' W' : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
