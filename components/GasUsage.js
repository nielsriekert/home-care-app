import styles from '../styles/Home.module.css';
import React from 'react';

import { Bar } from 'react-chartjs-2';

function GasUsage({ gasUsage }) {
	return (
		<div className={styles['gas-usage-container']}>
			<Bar
				data={{
					labels: gasUsage.map(usage => {
						const hours = new Date(usage.period.end * 1000).getHours();
						const minutes = new Date(usage.period.end * 1000).getMinutes();
						return (hours.toString().length === 1 ? '0' : '') + hours + ':' + (minutes.toString().length === 1 ? '0' : '') + + minutes
					}),
					datasets: [{
						label: 'Received (m³)',
						backgroundColor: gasUsage.map(() => 'rgba(255, 235, 200, .2)'),
						borderColor:  gasUsage.map(() => 'rgba(255, 235, 200, .3)'),
						borderWidth: gasUsage.map(() => 2),
						data: gasUsage.map(usage => usage.received.toFixed(3))
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