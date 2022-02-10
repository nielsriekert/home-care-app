import React from 'react';
import styles from './WaterUsage.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { DateTime } from 'luxon';

import { WATER_EXCHANGE } from '../../fragments';

const WATER_USAGE = gql`
	${WATER_EXCHANGE}
	query waterExchange($start: Int! $end: Int!) {
		waterExchange(start: $start end: $end) {
			...WaterExchangeFields
		}
	}
`;

export default function WaterUsage({ start, end }) {
	const { error, data, networkStatus } = useQuery(WATER_USAGE, {
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
			{networkStatus !== NetworkStatus.loading ? data.waterExchange ? <FormattedNumber value={data.waterExchange.received} style="unit" unit="liter" /> : 0 + ' l' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
