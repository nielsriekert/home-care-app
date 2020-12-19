import styles from '../styles/Home.module.css';
import React from 'react';

import { Bar } from 'react-chartjs-2';

function ElectricityUsage({ electricityUsage }) {
	return (
		<div className={styles['electricy-usage-container']}>
			<Bar
				data={{
					labels: electricityUsage.map(usage => {
						const hours = new Date(usage.period.end * 1000).getHours();
						const minutes = new Date(usage.period.end * 1000).getMinutes();
						return (hours.toString().length === 1 ? '0' : '') + hours + ':' + (minutes.toString().length === 1 ? '0' : '') + + minutes
					}),
					datasets: [{
						label: 'Received (kWh)',
						backgroundColor: electricityUsage.map(usage => 'rgba(200, 215, 255, .2)'),
						borderColor:  electricityUsage.map(usage => 'rgba(200, 215, 255, .3)'),
						borderWidth: electricityUsage.map(usage => 2),
						data: electricityUsage.map(usage => usage.received.toFixed(3))
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

// export async function getServerSideProps() {
// 	const apolloClient = initializeApollo();

// 	const { data } = await apolloClient.query({
// 		query: ELECTRIC_USAGE,
// 		variables: {
// 			resolution: 'TEN_MINUTES'
// 		}
// 	});

// 	return {
// 		props: {
// 			electricityUsage: data.electricityUsage,
// 		},
// 	};
// }