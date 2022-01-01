import React, { useEffect } from 'react';
import styles from './CurrentElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const CURRENT_ELECTRIC_RECEIVED = gql`
	query currentElectricityReceived {
		currentElectricityUsage {
			received(unit: WATT),
			readingAt
		}
	}
`;

export default function CurrentElectricityReceived({ updatedAt }) {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_RECEIVED, {
		pollInterval: 10000
	});

	useEffect(() => {
		if (data?.currentElectricityUsage?.readingAt && typeof updatedAt === 'function') {
			updatedAt(data.currentElectricityUsage.readingAt);
		}
	}, [data, updatedAt]);

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data?.currentElectricityUsage?.received ?
				<span><FormattedNumber value={data.currentElectricityUsage.received} /> W </span> : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
