import React from 'react';
import styles from './ElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { ELECTRICITY_EXCHANGE_OVER_TIME } from '../../fragments';

const TODAY_ELECTRICITY_DELIVERED = gql`
	${ELECTRICITY_EXCHANGE_OVER_TIME}
	query todayElectricityExchangeReceived($unit: ElectricEnergyOverTimeUnit) {
		todayElectricityExchange {
			...ElectricityExchangeOverTimeFields
		}
	}
`;

export default function ElectricityDelivered() {
	const { error, data, networkStatus } = useQuery(TODAY_ELECTRICITY_DELIVERED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ?
				data && data.todayElectricityExchange ?
					<ToolTip title="Electricity delivered to the grid"><span><FormattedNumber value={data.todayElectricityExchange.delivered} /> kWh</span></ToolTip> :
					0 + ' kWh' :
				<Skeleton width="3em" />}
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
