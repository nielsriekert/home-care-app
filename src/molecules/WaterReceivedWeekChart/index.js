import React from 'react';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';

import { EXCHANGE } from './fragments';

import { useQuery, gql } from '@apollo/client';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WATER_RECEIVED_WEEK_CHART = gql`
	${EXCHANGE}
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
		exchangeMonday: waterExchange(
			start: $startMonday
			end: $endMonday
		) {
			...WaterExchange
		}

		exchangeTuesday: waterExchange(
			start: $startTuesday
			end: $endTuesday
		) {
			...WaterExchange
		}

		exchangeWednesday: waterExchange(
			start: $startWednesday
			end: $endWednesday
		) {
			...WaterExchange
		}

		exchangeThursday: waterExchange(
			start: $startThursday
			end: $endThursday
		) {
			...WaterExchange
		}

		exchangeFriday: waterExchange(
			start: $startFriday
			end: $endFriday
		) {
			...WaterExchange
		}

		exchangeSaturday: waterExchange(
			start: $startSaturday
			end: $endSaturday
		) {
			...WaterExchange
		}

		exchangeSunday: waterExchange(
			start: $startSunday
			end: $endSunday
		) {
			...WaterExchange
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

	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	const weekDays = [
		{
			data: data.exchangeMonday,
			weekDay: startMonday
		},
		{
			data: data.exchangeTuesday,
			weekDay: startTuesday
		},
		{
			data: data.exchangeWednesday,
			weekDay: startWednesday
		},
		{
			data: data.exchangeThursday,
			weekDay: startThursday
		},
		{
			data: data.exchangeFriday,
			weekDay: startFriday
		},
		{
			data: data.exchangeSaturday,
			weekDay: startSaturday
		},
		{
			data: data.exchangeSunday,
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