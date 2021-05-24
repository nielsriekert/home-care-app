import React from 'react';
import styles from './WaterUsage.module.css';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const WATER_EXCHANGE = gql`
	query waterExchange($start: Int! $end: Int!) {
		waterExchange(start: $start end: $end) {
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
	const { loading, error, data } = useQuery(WATER_EXCHANGE, {
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data.waterExchange ? <FormattedNumber value={data.waterExchange.received} style="unit" unit="liter" /> : 0 + ' l' : <Skeleton width="3em" /> }
		</div>
	);
}
