import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { Bar } from 'react-chartjs-2';

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
			resolution: 'TEN_MINUTES'
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="electricy-usage-container">
			<Bar
				data={{
					labels: data.electricityUsage.map(usage => {
						const hours = new Date(usage.period.end * 1000).getHours();
						const minutes = new Date(usage.period.end * 1000).getMinutes();
						return (hours.toString().length === 1 ? '0' : '') + hours + ':' + (minutes.toString().length === 1 ? '0' : '') + + minutes
					}),
					datasets: [{
						label: "Received (kWh)",
						backgroundColor: data.electricityUsage.map(usage => 'rgba(200, 215, 255, .2)'),
						borderColor:  data.electricityUsage.map(usage => 'rgba(200, 215, 255, .3)'),
						borderWidth: data.electricityUsage.map(usage => 2),
						data: data.electricityUsage.map(usage => usage.received.toFixed(3))
					}]
				}}
				width={800}
				height={280}
				options={{
					title: {
						display: true,
						fontColor: 'white',
						text: 'Electrical Usage'
					}
				}}
			/>
		</div>
	);
}

export default ElectricityUsage;