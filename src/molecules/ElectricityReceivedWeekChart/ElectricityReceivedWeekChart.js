import React from 'react';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { CONSUMPTION } from './fragments';

import { useQuery, gql } from '@apollo/client';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_RECEIVED_WEEK_CHART = gql`
	${CONSUMPTION}
	query electricityConsumptionCurrentWeek(
		$startMonday: Int!
		$endMonday: Int!
		$startTuesday: Int!
		$endTuesday: Int!
		$startWednesday: Int!
		$endWednesday: Int!
		$startThursday: Int!
		$endThursday: Int!
		$startFriday: Int!
		$endFriday: Int!
		$startSaturday: Int!
		$endSaturday: Int!
		$startSunday: Int!
		$endSunday: Int!
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

		consumptionThursday: electricityConsumption(
			start: $startThursday
			end: $endThursday
		) {
			...consumption
		}

		consumptionFriday: electricityConsumption(
			start: $startFriday
			end: $endFriday
		) {
			...consumption
		}

		consumptionSaturday: electricityConsumption(
			start: $startSaturday
			end: $endSaturday
		) {
			...consumption
		}

		consumptionSunday: electricityConsumption(
			start: $startSunday
			end: $endSunday
		) {
			...consumption
		}
	}
`;

export default function ElectricityReceivedWeekChart() {
	const startMonday = DateTime.local().startOf('week');
	const startTuesday =  DateTime.local().startOf('week').plus({ day: 1 });
	const startWednesday = DateTime.local().startOf('week').plus({ day: 2 });
	const startThursday = DateTime.local().startOf('week').plus({ day: 3 });
	const startFriday = DateTime.local().startOf('week').plus({ day: 4 });
	const startSaturday = DateTime.local().startOf('week').plus({ day: 5 });
	const startSunday = DateTime.local().startOf('week').plus({ day: 6 });

	const { loading, error, data } = useQuery(ELECTRIC_RECEIVED_WEEK_CHART, {
		variables: {
			startMonday: startMonday.toSeconds(),
			endMonday: startTuesday.toSeconds(),
			startTuesday: startTuesday.toSeconds(),
			endTuesday: startWednesday.toSeconds(),
			startWednesday: startWednesday.toSeconds(),
			endWednesday: startThursday.toSeconds(),
			startThursday: startThursday.toSeconds(),
			endThursday: startFriday.toSeconds(),
			startFriday: startFriday.toSeconds(),
			endFriday: startSaturday.toSeconds(),
			startSaturday: startSaturday.toSeconds(),
			endSaturday: startSunday.toSeconds(),
			startSunday: startSunday.toSeconds(),
			endSunday: startSunday.plus({ day: 1 }).toSeconds(),
		}
	});

	if (loading) return <Skeleton width="100%" height="700px" />;
	if (error) return <Message type="error">{error.message}</Message>;

	const weekDays = [
		{
			data: data.consumptionMonday,
			weekDayName: startMonday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionTuesday,
			weekDayName: startTuesday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionWednesday,
			weekDayName: startWednesday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionThursday,
			weekDayName: startThursday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionFriday,
			weekDayName: startFriday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionSaturday,
			weekDayName: startSaturday.toLocaleString({ weekday: 'long' })
		},
		{
			data: data.consumptionSunday,
			weekDayName: startSunday.toLocaleString({ weekday: 'long' })
		}
	].filter(weekData => weekData.data);

	return (
		<div>
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
						categories: weekDays.slice().map(weekDayUsage => weekDayUsage.weekDayName),
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
						data: weekDays.slice().map(weekDayUsage => [weekDayUsage.weekDayName, Math.round((weekDayUsage.data.received + Number.EPSILON) * 100) / 100]),
						color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
