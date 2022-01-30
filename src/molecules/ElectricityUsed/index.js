import React from 'react';
import styles from './ElectricityUsed.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';

import { useQuery, gql } from '@apollo/client';
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

export default function ElectricityUsed({ start, end }) {
	const { loading, error, data } = useQuery(TODAY_ELECTRICITY_RECEIVED_USED);

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data && data?.todayElectricityExchange?.used !== null ? <span><FormattedNumber value={data.todayElectricityExchange.used} /> kWh</span> : '-' : <Skeleton width="3em" /> }
		</div>
	);
}
