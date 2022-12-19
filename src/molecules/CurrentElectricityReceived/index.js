import React, { useEffect } from 'react';
import styles from './CurrentElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { ELECTRICITY_USAGE } from '../../fragments';

const CURRENT_ELECTRIC_RECEIVED = gql`
	${ELECTRICITY_USAGE}
	query currentElectricityReceived {
		currentElectricityUsage {
			...ElectricityUsageFields
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

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{loading && <Skeleton width="3em" />}
			{typeof data?.currentElectricityUsage?.received === 'number' ? <ToolTip title="Actual power receiving from the grid"><span><FormattedNumber value={data.currentElectricityUsage.received} /> W</span></ToolTip> : !loading ? '-' : ''}
		</div>
	);
}
