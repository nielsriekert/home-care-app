import React from 'react';
import styles from './ElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { ELECTRICITY_EXCHANGE_OVER_TIME } from '../../fragments';

const TODAY_ELECTRICITY_RECEIVED = gql`
	${ELECTRICITY_EXCHANGE_OVER_TIME}
	query todayElectricityExchangeReceived($unit: ElectricEnergyOverTimeUnit) {
		todayElectricityExchange {
			...ElectricityExchangeOverTimeFields
		}
	}
`;

export default function ElectricityReceived({ start, end }) {
	const { error, data, networkStatus } = useQuery(TODAY_ELECTRICITY_RECEIVED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ? data && data.todayElectricityExchange ? <span><FormattedNumber value={data.todayElectricityExchange.received} /> kWh</span> : 0 + ' kWh' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
