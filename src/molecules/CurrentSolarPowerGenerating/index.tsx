import { useEffect } from 'react';
import styles from './CurrentSolarPowerGenerating.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';

import { useQuery } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const CurrentSolarPowerGenerating_Query = graphql(`#graphql
	query solarPowerGenerated {
		currentSolarPowerGenerating {
			received(unit: WATT),
			readingAt
		}
	}
`);

export default function CurrentSolarPowerGenerating({
	updatedAt,
}: {
	updatedAt?: (timestamp: number) => void
}) {
	const { data, loading, error } = useQuery(CurrentSolarPowerGenerating_Query, {
		pollInterval: 10000
	});

	useEffect(() => {
		if (data?.currentSolarPowerGenerating?.readingAt && typeof updatedAt === 'function') {
			updatedAt(data.currentSolarPowerGenerating.readingAt);
		}
	}, [data, updatedAt]);

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{!loading ?
				data?.currentSolarPowerGenerating?.received && data.currentSolarPowerGenerating.received !== null ?
					<ToolTip title="Actual power from the sun">
						<span><FormattedNumber value={data.currentSolarPowerGenerating.received} /> W </span>
					</ToolTip> :
					<ToolTip title="No solar power generating"><span>-</span></ToolTip> :
				<Skeleton width="3em" /> }
		</div>
	);
}
