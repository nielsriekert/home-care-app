import React from 'react';
import styles from './GasUsage.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

const GAS_CONSUMPTION = gql`
	query gasConsumption($start: Int! $end: Int!) {
		gasConsumption(start: $start end: $end) {
			received
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

export default function GasUsage({ start, end }) {
	const { loading, error, data } = useQuery(GAS_CONSUMPTION, {
		fetchPolicy: 'network-only',
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data.gasConsumption ? data.gasConsumption.received + ' m³' : 0 + ' m³' : <Skeleton width="3em" /> }
		</div>
	);
}
