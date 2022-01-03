import React from 'react';
import styles from './ElectricityDelivered.module.css';

import Message from '../../atoms/Message';
import Skeleton from '../../atoms/Skeleton';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { DateTime } from 'luxon';

import { ELECTRICITY_EXCHANGE } from '../../fragments';

const ELECTRICITY_DELIVERED = gql`
	${ELECTRICITY_EXCHANGE}
	query electricityDelivered($start: Int! $end: Int! $unit: ElectricEnergyOverTimeUnit) {
		electricityExchange(start: $start end: $end) {
			...ElectricityExchangeFields
		}
	}
`;

export default function ElectricityDelivered({ start, end }) {
	const { loading, error, data } = useQuery(ELECTRICITY_DELIVERED, {
		variables: {
			start: start || Math.round(DateTime.now().startOf('day').toSeconds()),
			end: end || Math.floor(DateTime.now().endOf('day').toSeconds())
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data && data.electricityExchange ? <span><FormattedNumber value={data.electricityExchange.delivered} /> kWh</span> : 0 + ' kWh' : <Skeleton width="3em" />}
		</div>
	);
}
