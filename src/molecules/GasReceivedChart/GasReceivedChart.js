import React from 'react';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { useQuery, gql } from '@apollo/client';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GAS_EXCHANGES_CHART = gql`
	query gasExchanges($resolution: TimeSpan $timePeriod: TimePeriodInput!) {
		gasExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received
			period {
				start
				end
			}
		}
	}
`;

const now = DateTime.now();

export default function GasUsage() {
	const { loading, error, data } = useQuery(GAS_EXCHANGES_CHART, {
		fetchPolicy: 'network-only',
		variables: {
			resolution: 'TWO_HOURS',
			timePeriod: {
				start: Math.floor(now.minus({ days: 4 }).toSeconds()),
				end: Math.floor(now.toSeconds())
			}
		}
	});

	if (loading) return <Skeleton width="100%" height="300px" />;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div className="gas-usage-container">
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
							text: 'm³'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'm³',
						type: 'column',
						showInLegend: false,
						data: data.gasExchanges.map(usage => [usage.period.end * 1000, usage.received]),
						color: 'hsla(var(--color-gas-h), var(--color-gas-s), var(--color-gas-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
