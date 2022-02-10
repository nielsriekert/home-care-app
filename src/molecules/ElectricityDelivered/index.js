import React from 'react';
import styles from './ElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
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
	const { error, data, networkStatus } = useQuery(ELECTRICITY_DELIVERED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start: start || Math.round(DateTime.now().startOf('day').toSeconds()),
			end: end || Math.floor(DateTime.now().endOf('day').toSeconds())
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ? data && data.electricityExchange ? <span><FormattedNumber value={data.electricityExchange.delivered} /> kWh</span> : 0 + ' kWh' : <Skeleton width="3em" />}
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
