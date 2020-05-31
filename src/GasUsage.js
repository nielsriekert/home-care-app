import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { Bar } from 'react-chartjs-2';

const GAS_USAGE = gql`
	query gasUsage {
		gasUsage {
			received
			period {
				start
				end
			}
		}
	}
`;

function GasUsage() {
	const { loading, error, data } = useQuery(GAS_USAGE);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="gas-usage-container">
			<Bar
				data={{
					labels: data.gasUsage.map(usage => {
						const hours = new Date(usage.period.end * 1000).getHours();
						const minutes = new Date(usage.period.end * 1000).getMinutes();
						return (hours.toString().length === 1 ? '0' : '') + hours + ':' + (minutes.toString().length === 1 ? '0' : '') + + minutes
					}),
					datasets: [{
						label: "Received (m³)",
						backgroundColor: data.gasUsage.map(usage => 'rgba(255, 255, 245, .2)'),
						borderColor:  data.gasUsage.map(usage => 'rgba(255, 255, 245, .3)'),
						borderWidth: data.gasUsage.map(usage => 2),
						data: data.gasUsage.map(usage => usage.received.toFixed(3))
					}]
				}}
				width={800}
				height={280}
				options={{
					title: {
						display: true,
						fontColor: 'white',
						text: 'Gas Usage'
					}
				}}
			/>
		</div>
	);
}

export default GasUsage;