import React from 'react';

import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_DELIVERED_CHART = gql`
	query electricityDeliveredChart($resolution: TimeSpan $hoursInThePast: Float) {
		electricityUsage(resolution: $resolution hoursInThePast: $hoursInThePast) {
			delivered(unit:WATT_HOUR)
			period {
				start
				end
			}
		}
	}
`;

export default function ElectricityDeliveredChart({ resolution, hoursInThePast }) {
	const { loading, error, data } = useQuery(ELECTRIC_DELIVERED_CHART, {
		fetchPolicy: 'network-only',
		variables: {
			resolution: resolution || 'FIVE_MINUTES',
			hoursInThePast: hoursInThePast || 8
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div>
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
					xAxis: {
						type: 'datetime',
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)'
					},
					yAxis: {
						title: {
							text: 'Wh'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'Wh',
						showInLegend: false,
						data: data.electricityUsage.slice().reverse().map(usage => [usage.period.end * 1000, Math.round((usage.delivered + Number.EPSILON) * 100) / 100]),
						color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
