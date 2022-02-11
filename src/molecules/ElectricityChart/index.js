import React, { useState, useEffect } from 'react';

import { useLazyQuery, gql } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';
import Button from '../../atoms/Button';

import useIntersect from '../../hooks/useIntersect';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { ELECTRICITY_EXCHANGE } from '../../fragments';

const ELECTRIC_EXCHANGES_CHART = gql`
	${ELECTRICITY_EXCHANGE}
	query electricityExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
		$includePrevious: Boolean!
		$unit: ElectricEnergyOverTimeUnit
	) {
		electricityExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			...ElectricityExchangeFields
		}

		electricityExchangesPrevious: electricityExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			...ElectricityExchangeFields
		}
	}
`;

const SOLAR_POWER_EXCHANGES_CHART = gql`
	query solarExchangesLastEightHoursChart($unit: ElectricEnergyOverTimeUnit) {
		solarExchangesLastEightHours {
			received(unit: $unit)
			period {
				start
				end
			}
		}
	}
`;

export default function ElectricityChart({
	resolution,
	start,
	end,
	unit = 'KILOWATT_HOUR',
	chartType = 'line',
	timeFormat = null,
	includePrevious = false,
	softMax = undefined,
	includeSolarPower = false
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [readings, setReadings] = useState([]);
	const [readingsPrevious, setPreviousReadings] = useState([]);
	const [readingsSolar, setReadingsSolar] = useState([]);
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(ELECTRIC_EXCHANGES_CHART, {
		variables: {
			resolution,
			timePeriod: {
				start,
				end
			},
			includePrevious,
			timePeriodPrevious: {
				start: start - (end - start),
				end: start
			},
			unit
		}
	});
	const [loadSolarReadings, { loading: loadingSolar, error: errorSolar, data: dataSolar }] = useLazyQuery(SOLAR_POWER_EXCHANGES_CHART, {
		variables: {
			unit
		}
	});

	useEffect(() => {
		if (!called && entry.intersectionRatio >= 0.2) {
			loadReadings();
			if (includeSolarPower) {
				loadSolarReadings();
			}
		}
	}, [entry, called, loadReadings, includeSolarPower, loadSolarReadings]);

	useEffect(() => {
		if (data) {
			setReadings(data.electricityExchanges.map(exchange => ({
				...exchange,
				label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
			})));

			if (data.electricityExchangesPrevious) {
				setPreviousReadings(data.electricityExchangesPrevious.map(exchange => ({
					...exchange,
					label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
				})));
			}
		}
	}, [data, setReadings, timeFormat]);

	useEffect(() => {
		if (dataSolar && dataSolar.solarExchangesLastEightHours) {
			setReadingsSolar(dataSolar.solarExchangesLastEightHours.map(exchange => ({
				...exchange,
				label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
			})));
		}
	}, [dataSolar, setReadingsSolar, timeFormat]);

	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div ref={setRefContainer}>
			{!called && <Button onClick={loadReadings}>Load chart</Button>}
			{loading && (!includeSolarPower || loadingSolar) && <SkeletonChart />}
			{(error || errorSolar) && <Message type="error">{error ? error.message : errorSolar.message}</Message>}
			{readings.length > 0 && (!includeSolarPower || !loadingSolar) &&
				<HighchartsReact
					highcharts={Highcharts}
					options={{
						title: false,
						chart: {
							backgroundColor: 'transparent',
						},
						legend: {
							itemStyle: {
								color: 'var(--color-secondary-shade-3)',
							},
							itemHoverStyle: {
								color: 'white',
							}
						},
						plotOptions: {
							series: {
								borderWidth: 0
							}
						},
						credits: {
							enabled: false
						},
						xAxis: {
							type: !timeFormat ? 'datetime' : undefined,
							categories: timeFormat ? readings.map(reading => reading.label) : undefined,
							lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							plotBands: readings.filter(reading => reading.dataPointsCount === 0).map(reading => ({
								color: 'hsla(var(--color-secondary-shade-1-h), var(--color-secondary-shade-1-s), var(--color-secondary-shade-1-l), 0.2)',
								from: reading.period.start * 1000,
								to: reading.period.end * 1000
							})),
						},
						yAxis: {
							title: {
								text: unit === 'WATT_HOUR' ? 'Wh' : 'kWh'
							},
							softMax,
							gridLineColor: 'var(--color-secondary-shade-2)',
						},
						time: {
							useUTC: false
						},
						series: [{
							name: 'Received',
							type: chartType,
							showInLegend: includePrevious || includeSolarPower,
							data: readings.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.received]),
							color: 'var(--color-electricity-received)'
						},
						{
							name: 'Delivered',
							type: chartType,
							showInLegend: includePrevious || includeSolarPower,
							data: readings.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.delivered]),
							color: 'var(--color-electricity-delivered)'
						}].concat(readingsPrevious.length > 0 ? [{
							name: 'Previously received',
							showInLegend: true,
							type: chartType,
							data: readingsPrevious.map(usage => [timeFormat ? usage.label : (usage.period.end + (end - start)) * 1000, usage.received]),
							color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .3)'
						},
						{
							name: 'Previously delivered',
							showInLegend: true,
							type: chartType,
							data: readingsPrevious.map(usage => [timeFormat ? usage.label : (usage.period.end + (end - start)) * 1000, usage.delivered]),
							color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .3)'
						}] : []).concat(
							readingsSolar.length > 0 ? [{
								name: 'Solar',
								showInLegend: true,
								type: chartType,
								data: readingsSolar.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.received]),
								color: 'hsla(var(--color-electricity-solar-h), var(--color-electricity-solar-s), var(--color-electricity-solar-l), .3)'
							}] : []
						).reverse()
					}}
				/>}
			{called && !loading && readings.length <= 0 && <Message>No data</Message>}
		</div>
	);
}
