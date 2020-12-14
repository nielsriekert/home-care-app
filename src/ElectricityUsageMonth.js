import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { Bar } from 'react-chartjs-2';

const ELECTRIC_USAGE = gql`
	query electricityConsumptionByMonth(
		$startCurrentMonth: Int!
		$endCurrentMonth: Int!
		$startPreviousMonth: Int!
		$endPreviousMonth: Int!
		$startTwoMonthsAgo: Int!
		$endTwoMonthsAgo: Int!
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
	}
`;

function ElectricityUsageMonth() {
	const date = new Date();
	const startCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
	const endCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

	const startPreviousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0);
	const endPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59);

	const startTwoMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 2, 1, 0, 0, 0);
	const endTwoMonthsAgo = new Date(date.getFullYear(), date.getMonth() - 1, 0, 23, 59, 59);

	const { loading, error, data } = useQuery(ELECTRIC_USAGE, {
		variables: {
			startCurrentMonth: startCurrentMonth.getTime() / 1000,
			endCurrentMonth: endCurrentMonth.getTime() / 1000,
			startPreviousMonth: startPreviousMonth.getTime() / 1000,
			endPreviousMonth: endPreviousMonth.getTime() / 1000,
			startTwoMonthsAgo: startTwoMonthsAgo.getTime() / 1000,
			endTwoMonthsAgo: endTwoMonthsAgo.getTime() / 1000,
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
		}
	].filter(monthData => monthData.data);

	return (
		<div className="electricy-usage-month-container">
			<Bar
				data={{
					labels: months.map(monthUsage => monthUsage.monthName),
					datasets: [{
						label: "Received (kWh)",
						backgroundColor: months.map(usage => 'rgba(200, 215, 255, .2)'),
						borderColor:  months.map(usage => 'rgba(200, 215, 255, .3)'),
						borderWidth: months.map(usage => 2),
						data: months.map(monthUsage => monthUsage.data.received.toFixed(3))
					}]
				}}
				width={800}
				height={280}
				options={{
					title: {
						display: true,
						fontColor: 'white',
						text: 'Electrical Usage per Month'
					}
				}}
			/>
		</div>
	);
}

export default ElectricityUsageMonth;