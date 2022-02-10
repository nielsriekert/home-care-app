import React from 'react';
import styles from './SolarPowerGenerated.module.css';

import Message from '../../atoms/Message';
import Skeleton from '../../atoms/Skeleton';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const SOLAR_POWER_RECEIVED = gql`
	query solarPowerReceived($start: Int! $end: Int!) {
		solarPowerExchange(start: $start end: $end) {
			received
			period {
				start
				end
			}
		}
	}
`;

export default function SolarPowerGenerated({ start, end }) {
	const { error, data, networkStatus } = useQuery(SOLAR_POWER_RECEIVED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start: start || 0,
			end: end || 0
		}
	});

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ? data && data.solarPowerExchange ? <span><FormattedNumber value={data.solarPowerExchange.received} /> kWh</span> : 0 + ' kWh' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
