import styles from './CumulativeWaterUsageChart.module.css';

import SkeletonChart from '../SkeletonChart';
import Alert from '../../atoms/Alert';

import { useQuery } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAnnotations from 'highcharts/modules/annotations';

import { graphql } from '../../types/graphql';

const CumulativeWaterUsage_Query = graphql(`#graphql
	query cumulativeWaterUsage($start: Int! $end: Int!) {
		cumulativeWaterUsage(start: $start end: $end) {
			reading
			readingAt
			isVerified
		}
	}
`);

HighchartsAnnotations(Highcharts);

export default function CumulativeWaterUsageChart({
	start,
	end,
}: {
	start: number,
	end: number,
}) {
	const { data, loading, error } = useQuery(CumulativeWaterUsage_Query, {
		variables: {
			start,
			end,
		}
	});

	if (loading) return <SkeletonChart />;
	if (error) return <Alert severity="error">{error.message}</Alert>;

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
						labels: data?.cumulativeWaterUsage.filter(reading => reading.isVerified).map(({ reading, readingAt }) => ({
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
						labels: {
							style: {
								color: 'var(--color-secondary-shade-3)'
							}
						},
						type: 'datetime',
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						min: start * 1000,
						max: end * 1000
					},
					yAxis: {
						title: {
							text: 'liter'
						},
						labels: {
							style: {
								color: 'var(--color-secondary-shade-3)'
							}
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'liter',
						showInLegend: false,
						data: data?.cumulativeWaterUsage.map(usage => [usage.readingAt * 1000, usage.reading]),
						color: 'hsla(var(--color-water-h), var(--color-water-s), var(--color-water-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
