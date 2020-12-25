import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_USAGE = gql`
	query electricityUsage($resolution: TimeSpan) {
		electricityUsage(resolution: $resolution) {
			delivered
			received
			period {
				start
				end
			}
		}
	}
`;

function ElectricityUsage() {
	const { loading, error, data } = useQuery(ELECTRIC_USAGE, {
		variables: {
			resolution: 'MINUTE'
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="electricy-usage-container">
			<h3>Electric Usage</h3>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					title: false,
					chart: {
						width: 1200,
						backgroundColor: 'transparent',
						// styledMode: true
					},
					credits: {
						enabled: false
					},
					xAxis: {
						type: 'datetime',
						reversed: true
					},
					series: [{
						name: 'Wh',
						data: data.electricityUsage.map(usage => [usage.period.end * 1000, usage.received])
					}]
				}}
			/>
		</div>
	);
}

export default ElectricityUsage;