import React from 'react';

import Skeleton from '../../atoms/Skeleton/Skeleton';
import Message from '../../atoms/Message/Message';

import { CONSUMPTION } from './fragments';

import { useQuery, gql } from '@apollo/client';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WATER_RECEIVED_WEEK_CHART = gql`
	${CONSUMPTION}
	query waterExchangeCurrentWeek(
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
		consumptionMonday: waterConsumption(
			start: $startMonday
			end: $endMonday
		) {
			...consumption
		}

		consumptionTuesday: waterConsumption(
			start: $startTuesday
			end: $endTuesday
		) {
			...consumption
		}

		consumptionWednesday: waterConsumption(
			start: $startWednesday
			end: $endWednesday
		) {
			...consumption
		}

		consumptionThursday: waterConsumption(
			start: $startThursday
			end: $endThursday
		) {
			...consumption
		}

		consumptionFriday: waterConsumption(
			start: $startFriday
			end: $endFriday
		) {
			...consumption
		}

		consumptionSaturday: waterConsumption(
			start: $startSaturday
			end: $endSaturday
		) {
			...consumption
		}

		consumptionSunday: waterConsumption(
			start: $startSunday
			end: $endSunday
		) {
			...consumption
		}
	}
`;

export default function WaterReceivedWeekChart() {
	const startMonday = DateTime.local().startOf('week');
	const startTuesday =  DateTime.local().startOf('week').plus({ day: 1 });
	const startWednesday = DateTime.local().startOf('week').plus({ day: 2 });
	const startThursday = DateTime.local().startOf('week').plus({ day: 3 });
	const startFriday = DateTime.local().startOf('week').plus({ day: 4 });
	const startSaturday = DateTime.local().startOf('week').plus({ day: 5 });
	const startSunday = DateTime.local().startOf('week').plus({ day: 6 });

	const { loading, error, data } = useQuery(WATER_RECEIVED_WEEK_CHART, {
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

	if (loading) return <Skeleton width="100%" height="300px" />;
	if (error) return <Message type="error">{error.message}</Message>;

	const weekDays = [
		{
			data: data.consumptionMonday,
			weekDay: startMonday
		},
		{
			data: data.consumptionTuesday,
			weekDay: startTuesday
		},
		{
			data: data.consumptionWednesday,
			weekDay: startWednesday
		},
		{
			data: data.consumptionThursday,
			weekDay: startThursday
		},
		{
			data: data.consumptionFriday,
			weekDay: startFriday
		},
		{
			data: data.consumptionSaturday,
			weekDay: startSaturday
		},
		{
			data: data.consumptionSunday,
			weekDay: startSunday
		}
	].map(weekData => ({
		...weekData,
		data: weekData.data || {
			received: 0,
			period: {
				start: weekData.weekDay.toSeconds(),
				end: weekData.weekDay.plus({ day: 1 }).toSeconds()
			}
		}
	}));

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
						categories: weekDays.slice().map(weekDayUsage => weekDayUsage.weekDay.toLocaleString({ weekday: 'long' })),
						lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
						tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)'
					},
					yAxis: {
						title: {
							text: 'liter'
						},
						gridLineColor: 'var(--color-secondary-shade-2)',
					},
					time: {
						useUTC: false
					},
					series: [{
						name: 'liter',
						type: 'column',
						showInLegend: false,
						data: weekDays.slice().map(weekDayUsage => [weekDayUsage.weekDay.toLocaleString({ weekday: 'long' }), weekDayUsage.data.received]),
						color: 'hsla(var(--color-water-h), var(--color-water-s), var(--color-water-l), .6)'
					}]
				}}
			/>
		</div>
	);
}
