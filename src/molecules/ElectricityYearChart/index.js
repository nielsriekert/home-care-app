import React, { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ELECTRIC_EXCHANGES_BY_YEAR = gql`
	query electricityExchangesByYear(
		$timePeriod: TimePeriodInput!
		$resolution: TimeSpan
	) {
		electricityExchanges(
			timePeriod: $timePeriod
			resolution: $resolution
		) {
			received
			delivered
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`;

export default function ElectricityYearChart({ yearsInThePast = 4 }) {
	const [readings, setReadings] = useState([]);
	const { loading, error, data } = useQuery(ELECTRIC_EXCHANGES_BY_YEAR, {
		variables: {
			resolution: 'YEAR',
			timePeriod: {
				start: Math.round(DateTime.now().minus({ year: yearsInThePast }).startOf('year').toSeconds()),
				end: Math.round(DateTime.now().endOf('year').toSeconds())
			},
		}
	});

	useEffect(() => {
		if (data) {
			setReadings(data.electricityExchanges.map(exchange => ({
				...exchange,
				label: DateTime.fromSeconds(exchange.period.start).toLocaleString({ year: 'numeric' })
			})));
		}
	}, [data, setReadings]);

	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div className="electricy-usage-month-container">
			{readings.length > 0 ?
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
							categories: readings.map(reading => reading.label),
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
								data: readings.map(reading => [reading.label, reading.received * -1]),
								color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .6)'
							},
							{
								name: 'kWh',
								type: 'column',
								showInLegend: false,
								data: readings.map(readings => [readings.label, readings.delivered]),
								color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .6)'
							}
						]
					}}
				/>
				: <Message>No data</Message>}
		</div>
	);
}
