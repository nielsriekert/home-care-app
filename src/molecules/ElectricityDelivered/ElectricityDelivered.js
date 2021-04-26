import React from 'react';
import styles from './ElectricityDelivered.module.css';

import Message from '../../atoms/Message/Message';
import Skeleton from '../../atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const ELECTRICITY_DELIVERED = gql`
	query electricityDelivered($start: Int! $end: Int!) {
		electricityConsumption(start: $start end: $end) {
			delivered
			period {
				start
				end
			}
		}
	}
`;

const getStartOfToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return Math.round(today.getTime() / 1000);
};

const getEndOfToday = () => {
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return Math.round(today.getTime() / 1000);
};

export default function ElectricityDelivered({ start, end }) {
	const { loading, error, data } = useQuery(ELECTRICITY_DELIVERED, {
		fetchPolicy: 'network-only',
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data && data.electricityConsumption ? data.electricityConsumption.delivered + ' kWh' : 0 + ' kWh' : <Skeleton width="3em" />}
		</div>
	);
}
