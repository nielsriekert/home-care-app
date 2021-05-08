import React from 'react';
import styles from './CumulativeWaterUsageChart.module.css';

import SkeletonChart from '../../molecules/SkeletonChart/SkeletonChart';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAnnotations from 'highcharts/modules/annotations';

HighchartsAnnotations(Highcharts);

const CUMULATIVE_WATER_USAGE = gql`
	query cumulativeWaterUsage($start: Int! $end: Int!) {
		cumulativeWaterUsage(start: $start end: $end) {
			reading
			readingAt
			isVerified
		}
	}
`;

const getStartOfToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return Math.round(today.getTime() / 1000);
};

const getEndOfToday = () => {
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return Math.round(today.getTime() / 1000);
};

export default function CumulativeWaterUsageChart({ start, end }) {
	const { loading, error, data } = useQuery(CUMULATIVE_WATER_USAGE, {
		variables: {
			start: start || getStartOfToday(),
			end: end || getEndOfToday()
		}
	});
	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div className={styles.container}>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					title: false,
					chart: {
						backgroundColor: 'transparent',
					},
					credits: {
						enabled: false
					},
					annotations: [{
						draggable: '',
						labelOptions: {
							backgroundColor: 'rgba(0,0,0,0.5)'
						},
						labels: data.cumulativeWaterUsage.filter(reading => reading.isVerified).map(({ reading, readingAt }) => ({
							point: {
								xAxis: 0,
								yAxis: 0,
								x: readingAt * 1000,
								y: reading
							},
							text: 'Verified'
						}))
					}],
					xAxis: {
						type: 'datetime',
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						min: (start || getStartOfToday()) * 1000,
						max: (end || getEndOfToday()) * 1000
					},
					yAxis: {
						title: {
							text: 'liter'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'liter',
						showInLegend: false,
						data: data.cumulativeWaterUsage.map(usage => [usage.readingAt * 1000, usage.reading]),
						color: 'hsla(var(--color-water-h), var(--color-water-s), var(--color-water-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
