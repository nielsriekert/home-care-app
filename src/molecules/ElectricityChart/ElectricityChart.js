import React from 'react';

import SkeletonChart from '../../molecules/SkeletonChart/SkeletonChart';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_RECEIVED_CHART = gql`
	query electricityExchangesChart($resolution: TimeSpan $timePeriod: TimePeriodInput!) {
		electricityExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received(unit:WATT_HOUR)
			delivered(unit:WATT_HOUR)
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`;

export default function ElectricityChart({ resolution, start, end }) {
	const { loading, error, data } = useQuery(ELECTRIC_RECEIVED_CHART, {
		variables: {
			resolution: resolution || 'FIVE_MINUTES',
			timePeriod: {
				start,
				end
			}
		}
	});

	if (loading) return <SkeletonChart />;
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
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						plotBands: data.electricityExchanges.filter(exchange => exchange.dataPointsCount === 0).map(exchange => ({
							color: 'hsla(var(--color-secondary-shade-1-h), var(--color-secondary-shade-1-s), var(--color-secondary-shade-1-l), 0.2)',
							from: exchange.period.start * 1000,
							to: exchange.period.end * 1000
						})),
					},
					yAxis: {
						title: {
							text: 'Wh'
						},
						softMax: 100,
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'Wh',
						showInLegend: false,
						data: data.electricityExchanges.map(usage => [usage.period.end * 1000, usage.received]),
						color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .6)'
					},
					{
						name: 'Wh',
						showInLegend: false,
						data: data.electricityExchanges.map(usage => [usage.period.end * 1000, usage.delivered]),
						color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
