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

function GasUsage() {
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
						lineColor: 'rgba(255, 255, 255, .2)',
						tickColor: 'rgba(255, 255, 255, .2)'
					},
					yAxis: {
						title: {
							text: 'm³'
						},
						gridLineColor: 'rgba(255, 255, 255, .1)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'm³',
						type: 'column',
						showInLegend: false,
						data: data.gasUsage.slice().reverse().map(usage => [usage.period.end * 1000, Math.round((usage.received + Number.EPSILON) * 100) / 100]),
						color: 'rgba(255, 235, 200, .5)'
					}]
				}}
			/>
		</div>
	);
}

export default GasUsage;