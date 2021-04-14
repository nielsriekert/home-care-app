import React from 'react';

import { useQuery, gql } from '@apollo/client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_USAGE = gql`
	query electricityConsumptionByMonth(
		$startCurrentMonth: Int!
		$endCurrentMonth: Int!
		$startPreviousMonth: Int!
		$endPreviousMonth: Int!
		$startTwoMonthsAgo: Int!
		$endTwoMonthsAgo: Int!
		$startThreeMonthsAgo: Int!
		$endThreeMonthsAgo: Int!
	) {
		consumptionCurrentMonth: electricityConsumption(
			start: $startCurrentMonth
			end: $endCurrentMonth
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		consumptionPreviousMonth: electricityConsumption(
			start: $startPreviousMonth
			end: $endPreviousMonth
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		consumptionTwoMonthsAgo: electricityConsumption(
			start: $startTwoMonthsAgo
			end: $endTwoMonthsAgo
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		consumptionThreeMonthsAgo: electricityConsumption(
			start: $startThreeMonthsAgo
			end: $endThreeMonthsAgo
		) {
			received
			delivered
			period {
				start
				end
			}
		}
	}
`;

export default function ElectricityUsageMonth() {
	const date = new Date();
	const startCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
	const endCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

	const startPreviousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0);
	const endPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59);

	const startTwoMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 2, 1, 0, 0, 0);
	const endTwoMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 1, 0, 23, 59, 59);

	const startThreeMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 3, 1, 0, 0, 0);
	const endThreeMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 2, 0, 23, 59, 59);

	const { loading, error, data } = useQuery(ELECTRIC_USAGE, {
		variables: {
			startCurrentMonth: startCurrentMonth.getTime() / 1000,
			endCurrentMonth: endCurrentMonth.getTime() / 1000,
			startPreviousMonth: startPreviousMonth.getTime() / 1000,
			endPreviousMonth: endPreviousMonth.getTime() / 1000,
			startTwoMonthsAgo: startTwoMonthsAgo.getTime() / 1000,
			endTwoMonthsAgo: endTwoMonthsAgo.getTime() / 1000,
			startThreeMonthsAgo: startThreeMonthsAgo.getTime() / 1000,
			endThreeMonthsAgo: endThreeMonthsAgo.getTime() / 1000,
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	// TODO: not in render method
	const months = [
		{
			data: data.consumptionCurrentMonth,
			monthName: startCurrentMonth.toLocaleString('default', { month: 'long' })
		},
		{
			data: data.consumptionPreviousMonth,
			monthName: startPreviousMonth.toLocaleString('default', { month: 'long' })
		},
		{
			data: data.consumptionTwoMonthsAgo,
			monthName: startTwoMonthsAgo.toLocaleString('default', { month: 'long' })
		},
		{
			data: data.consumptionThreeMonthsAgo,
			monthName: startThreeMonthsAgo.toLocaleString('default', { month: 'long' })
		}
	].filter(monthData => monthData.data);

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
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)'
					},
					yAxis: {
						title: {
							text: 'kWh'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'kWh',
						type: 'column',
						showInLegend: false,
						data: months.slice().reverse().map(monthUsage => [monthUsage.monthName, Math.round((monthUsage.data.received + Number.EPSILON) * 100) / 100]),
						color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
