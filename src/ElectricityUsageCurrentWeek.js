import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_USAGE = gql`
	query electricityConsumptionCurrentWeek(
		$startMonday: Int!
		$endMonday: Int!
		$startTuesday: Int!
		$endTuesday: Int!
		$startWednesday: Int!
		$endWednesday: Int!
	) {
		consumptionMonday: electricityConsumption(
			start: $startMonday
			end: $endMonday
		) {
			...consumption
		}

		consumptionTuesday: electricityConsumption(
			start: $startTuesday
			end: $endTuesday
		) {
			...consumption
		}

		consumptionWednesday: electricityConsumption(
			start: $startWednesday
			end: $endWednesday
		) {
			...consumption
		}
	}

	fragment consumption on ElectricityConsumption {
		received
		delivered
		period {
			start
			end
		}
	}

`;

function ElectricityUsageCurrentWeek() {
	const startMonday = new Date(2020, 12, 28, 0, 0, 0);
	const endMonday = new Date(2020, 12, 28, 23, 59, 59);

	const startTuesday = new Date(2020, 12, 29, 0, 0, 0);
	const endTuesday = new Date(2020, 12, 29, 23, 59, 59);

	const startWednesday = new Date(2020, 12, 30, 0, 0, 0);
	const endWednesday = new Date(2020, 12, 30, 23, 59, 59);

	const { loading, error, data } = useQuery(ELECTRIC_USAGE, {
		variables: {
			startMonday: startMonday.getTime() / 1000,
			endMonday: endMonday.getTime() / 1000,
			startTuesday: startTuesday.getTime() / 1000,
			endTuesday: endTuesday.getTime() / 1000,
			startWednesday: startWednesday.getTime() / 1000,
			endWednesday: endWednesday.getTime() / 1000,
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	// TODO: not in render method
	const days = [
		{
			data: data.consumptionCurrentWeek,
			monthName: startCurrentWeek.toLocaleString('default', { month: 'long' })
		},
		{
			data: data.consumptionPreviousWeek,
			monthName: startPreviousWeek.toLocaleString('default', { month: 'long' })
		}
	].filter(dayData => dayData.data);

	return (
		<div className="electricy-usage-month-container">
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
						categories: months.slice().reverse().map(monthUsage => monthUsage.monthName),
						lineColor: 'rgba(255, 255, 255, .2)',
						tickColor: 'rgba(255, 255, 255, .2)'
					},
					yAxis: {
						title: {
							text: 'kWh'
						},
						gridLineColor: 'rgba(255, 255, 255, .1)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'kWh',
						type: 'column',
						showInLegend: false,
						data: months.slice().reverse().map(monthUsage => [monthUsage.monthName, Math.round((monthUsage.data.received + Number.EPSILON) * 100) / 100]),
						color: 'rgba(200, 215, 255, .5)'
					}]
				}}
			/>
		</div>
	);
}

export default ElectricityUsageCurrentWeek;