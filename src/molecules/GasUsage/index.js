import React from 'react';
import styles from './GasUsage.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { DateTime } from 'luxon';

const GAS_CONSUMPTION = gql`
	query gasExchange($start: Int! $end: Int!) {
		gasExchange(start: $start end: $end) {
			received
			period {
				start
				end
			}
		}
	}
`;

export default function GasUsage({ start, end }) {
	const { error, data, networkStatus } = useQuery(GAS_CONSUMPTION, {
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
			{networkStatus !== NetworkStatus.loading ? data.gasExchange ? <span><FormattedNumber value={data.gasExchange.received} /> m³</span> : 0 + ' m³' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
