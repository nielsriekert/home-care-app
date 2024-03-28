import { useEffect } from 'react';
import styles from './CurrentElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';

import { useQuery } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const CurrentElectricityDelivered_Query = graphql(`#graphql
	query currentElectricityDelivered {
		currentElectricityUsage {
			readingAt
			delivered(unit: WATT)
		}
	}
`);

export default function CurrentElectricityDelivered({ updatedAt }) {
	const { loading, error, data } = useQuery(CurrentElectricityDelivered_Query, {
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
