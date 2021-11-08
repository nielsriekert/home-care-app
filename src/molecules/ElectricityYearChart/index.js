import React from 'react';

import { useQuery, gql } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_EXCHANGE_BY_YEAR = gql`
	query electricityExchangeByYear(
		$startCurrentYear: Int!
		$endCurrentYear: Int!
		$startPreviousYear: Int!
		$endPreviousYear: Int!
		$startTwoYearsAgo: Int!
		$endTwoYearsAgo: Int!
		$startThreeYearsAgo: Int!
		$endThreeYearsAgo: Int!
	) {
		exchangeCurrentYear: electricityExchange(
			start: $startCurrentYear
			end: $endCurrentYear
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		exchangePreviousYear: electricityExchange(
			start: $startPreviousYear
			end: $endPreviousYear
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		exchangeTwoYearsAgo: electricityExchange(
			start: $startTwoYearsAgo
			end: $endTwoYearsAgo
		) {
			received
			delivered
			period {
				start
				end
			}
		}

		exchangeThreeYearsAgo: electricityExchange(
			start: $startThreeYearsAgo
			end: $endThreeYearsAgo
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

export default function ElectricityMonthChart() {
	const date = new Date();
	const startCurrentYear = new Date(date.getFullYear(), 1, 1, 0, 0, 0);
	const endCurrentYear = new Date(date.getFullYear() + 1, 1 + 1, 0, 23, 59, 59);

	const startPreviousYear = new Date(date.getFullYear() -1, 1 - 1, 1, 0, 0, 0);
	const endPreviousYear = new Date(date.getFullYear(), 1, 0, 23, 59, 59);

	const startTwoYearsAgo = new Date(date.getFullYear() - 2, 1 - 2, 1, 0, 0, 0);
	const endTwoYearsAgo = new Date(date.getFullYear() - 2, 1 - 1, 0, 23, 59, 59);

	const startThreeYearsAgo = new Date(date.getFullYear() - 3, 1 - 3, 1, 0, 0, 0);
	const endThreeYearsAgo = new Date(date.getFullYear() - 2, 1 - 2, 0, 23, 59, 59);

	const { loading, error, data } = useQuery(ELECTRIC_EXCHANGE_BY_YEAR, {
		variables: {
			startCurrentYear: startCurrentYear.getTime() / 1000,
			endCurrentYear: endCurrentYear.getTime() / 1000,
			startPreviousYear: startPreviousYear.getTime() / 1000,
			endPreviousYear: endPreviousYear.getTime() / 1000,
			startTwoYearsAgo: startTwoYearsAgo.getTime() / 1000,
			endTwoYearsAgo: endTwoYearsAgo.getTime() / 1000,
			startThreeYearsAgo: startThreeYearsAgo.getTime() / 1000,
			endThreeYearsAgo: endThreeYearsAgo.getTime() / 1000,
		}
	});

	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	// TODO: not in render method
	const years = [
		{
			data: data.exchangeThreeYearsAgo,
			yearName: startThreeYearsAgo.toLocaleString('default', { year: 'numeric' })
		},
		{
			data: data.exchangeTwoYearsAgo,
			yearName: startTwoYearsAgo.toLocaleString('default', { year: 'numeric' })
		},
		{
			data: data.exchangePreviousYear,
			yearName: startPreviousYear.toLocaleString('default', { year: 'numeric' })
		},
		{
			data: data.exchangeCurrentYear,
			yearName: startCurrentYear.toLocaleString('default', { year: 'numeric' })
		},
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
						categories: years.slice().map(yearUsage => yearUsage.yearName),
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)'
					},
					yAxis: {
						title: {
							text: 'kWh'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					plotOptions: {
						series: {
							stacking: 'normal'
						}
					},
					time: {
						useUTC: false
					},
					series: [
						{
							name: 'kWh',
							type: 'column',
							showInLegend: false,
							data: years.slice().map(yearUsage => [yearUsage.yearName, yearUsage.data.received * -1]),
							color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .6)'
						},
						{
							name: 'kWh',
							type: 'column',
							showInLegend: false,
							data: years.slice().map(yearUsage => [yearUsage.yearName, yearUsage.data.delivered]),
							color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .6)'
						}
					]
				}}
			/>
		</div>
	);
}
