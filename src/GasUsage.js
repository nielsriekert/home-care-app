import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GAS_USAGE = gql`
	query gasUsage($resolution: TimeSpan) {
		gasUsage(resolution: $resolution) {
			received
			period {
				start
				end
			}
		}
	}
`;

export default function GasUsage() {
	const { loading, error, data } = useQuery(GAS_USAGE, {
		fetchPolicy: 'cache-and-network',
		variables: {
			resolution: 'TWO_HOURS'
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

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
						data: data.gasUsage.slice().reverse().map(usage => [usage.period.end * 1000, Math.round((usage.received + Number.EPSILON) * 1000) / 1000]),
						color: 'hsla(var(--color-gas-h), var(--color-gas-s), var(--color-gas-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
