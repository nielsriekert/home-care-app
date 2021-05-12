import React from 'react';
import styles from './ElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const ELECTRICITY_RECEIVED = gql`
	query electricityReceived($start: Int! $end: Int!) {
		electricityExchange(start: $start end: $end) {
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

export default function ElectricityReceived({ start, end }) {
	const { loading, error, data } = useQuery(ELECTRICITY_RECEIVED, {
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data && data.electricityExchange ? <span><FormattedNumber value={data.electricityExchange.received} /> kWh</span> : 0 + ' kWh' : <Skeleton width="3em" /> }
		</div>
	);
}
