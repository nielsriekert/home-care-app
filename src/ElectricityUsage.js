import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_USAGE = gql`
	query electricityUsage($resolution: TimeSpan $hoursInThePast: Float) {
		electricityUsage(resolution: $resolution hoursInThePast: $hoursInThePast) {
			received(unit:WATT_HOUR)
			received(unit:WATT_HOUR)
			period {
				start
				end
			}
		}
	}
`;

function ElectricityUsage({ resolution, hoursInThePast }) {
	const { loading, error, data } = useQuery(ELECTRIC_USAGE, {
		variables: {
			resolution: resolution || 'FIVE_MINUTES',
			hoursInThePast: hoursInThePast || 8
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="electricity-usage-container">
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
							text: 'Wh'
						},
						gridLineColor: 'rgba(255, 255, 255, .1)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'Wh',
						showInLegend: false,
						data: data.electricityUsage.slice().reverse().map(usage => [usage.period.end * 1000, Math.round((usage.received + Number.EPSILON) * 100) / 100]),
						color: 'rgba(200, 215, 255, .5)'
					}]
				}}
			/>
		</div>
	);
}

export default ElectricityUsage;