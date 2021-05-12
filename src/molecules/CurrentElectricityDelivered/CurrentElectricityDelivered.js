import React from 'react';
import styles from './CurrentElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const CURRENT_ELECTRIC_DELIVERED = gql`
	query currentElectricityDelivered {
		currentElectricityUsage {
			delivered(unit: WATT),
			readingAt
		}
	}
`;

export default function CurrentElectricityDelivered() {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_DELIVERED);

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data?.currentElectricityUsage?.delivered ? <span><FormattedNumber value={data.currentElectricityUsage.delivered} /> W</span> : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
