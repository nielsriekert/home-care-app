import React from 'react';
import styles from './ElectricityUsage.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const ELECTRICITY_CONSUMPTION = gql`
	query electricityConsumption($start: Int! $end: Int!) {
		electricityConsumption(start: $start end: $end) {
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

export default function WaterUsage({ start, end }) {
	const { loading, error, data } = useQuery(ELECTRICITY_CONSUMPTION, {
		fetchPolicy: 'cache-and-network',
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});

	if (error) return <p>Error :(</p>;
	return (
		<div className={styles.container}>
			{!loading ? data.electricityConsumption ? data.electricityConsumption.received + ' kWh' : 0 + ' kWh' : <Skeleton width="3em" /> }
		</div>
	);
}
