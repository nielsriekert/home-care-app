import React from 'react';
import styles from './ElectricityUsed.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { ELECTRICITY_EXCHANGE_OVER_TIME } from '../../fragments';

const TODAY_ELECTRICITY_RECEIVED_USED = gql`
	${ELECTRICITY_EXCHANGE_OVER_TIME}
	query todayElectricityExchange($unit: ElectricEnergyOverTimeUnit) {
		todayElectricityExchange {
			...ElectricityExchangeOverTimeFields
		}
	}
`;

export default function ElectricityUsed() {
	const { error, data, networkStatus } = useQuery(TODAY_ELECTRICITY_RECEIVED_USED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ?
				data?.todayElectricityExchange?.used !== null ?
					<ToolTip title="Electricity used at home"><span><FormattedNumber value={data.todayElectricityExchange.used} /> kWh</span></ToolTip> :
					<ToolTip title="Cannot determinate electricity used at home"><span>-</span></ToolTip> :
				<Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
