import { useEffect } from 'react';
import styles from './CurrentElectricityUsing.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';

import { useQuery } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const CurrentElectricDelivered_Query = graphql(`#graphql
	query currentElectricityUsing {
		currentElectricityUsage {
			readingAt
			using(unit: WATT)
		}
	}
`);

export default function CurrentElectricityUsing({
	updatedAt,
}: {
	updatedAt?: (timestamp: number) => void
}) {
	const { data, loading, error } = useQuery(CurrentElectricDelivered_Query, {
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
			{typeof data?.currentElectricityUsage?.using === 'number' ?
				<ToolTip title="Actual power using at home"><span><FormattedNumber value={data.currentElectricityUsage.using} /> W</span></ToolTip> :
				!loading ?
					<ToolTip title="Cannot determinate electricity used at home"><span>-</span></ToolTip> :
					''}
		</div>
	);
}
