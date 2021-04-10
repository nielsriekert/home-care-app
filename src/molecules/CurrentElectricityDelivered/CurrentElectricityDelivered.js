import React from 'react';
import styles from './CurrentElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const CURRENT_ELECTRIC_USAGE = gql`
	query currentElectricityDelivered {
		currentElectricityUsage {
			delivered(unit: WATT),
			readingAt
		}
	}
`;

export default function CurrentElectricityDelivered() {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_USAGE, {
		fetchPolicy: 'cache-and-network',
	});

	if (error) return <p>Error :(</p>;
	return (
		<div className={styles.container}>
			{!loading ? data.currentElectricityUsage ? data.currentElectricityUsage.delivered + ' W' : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
