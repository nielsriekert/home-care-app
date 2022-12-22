import React, { useEffect } from 'react';
import styles from './CurrentElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { ELECTRICITY_USAGE } from '../../fragments';

const CURRENT_ELECTRIC_DELIVERED = gql`
	${ELECTRICITY_USAGE}
	query currentElectricityDelivered {
		currentElectricityUsage {
			...ElectricityUsageFields
		}
	}
`;

export default function CurrentElectricityDelivered({ updatedAt }) {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_DELIVERED, {
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
			{typeof data?.currentElectricityUsage?.delivered === 'number' ? <ToolTip title="Actual power delivering to the grid"><span><FormattedNumber value={data.currentElectricityUsage.delivered} /> W</span></ToolTip> : !loading ? '-' : ''}
		</div>
	);
}
