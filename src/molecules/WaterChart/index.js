import React, { useState, useEffect } from 'react';

import { useLazyQuery, gql } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';
import Button from '../../atoms/Button';

import useIntersect from '../../hooks/useIntersect';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { WATER_EXCHANGE } from '../../fragments';

const WATER_EXCHANGES_CHART = gql`
	${WATER_EXCHANGE}
	query waterExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
		$includePrevious: Boolean!
	) {
		waterExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			...WaterExchangeFields
		}

		waterExchangesPrevious: waterExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			...WaterExchangeFields
		}
	}
`;

/**
 * @param {object} props
 * @param {'YEAR' | 'MONTH' | 'WEEK' | 'DAY' | 'TWO_HOURS' | 'HOUR' | 'TEN_MINUTES' | 'FIVE_MINUTES' | 'MINUTE'} props.resolution
 * @param {number} props.start
 * @param {number} props.end
 * @param {'LITER'} [props.unit=LITER]
 * @returns
 */
export default function WaterChart({
	resolution,
	start,
	end,
	unit = 'LITER',
	chartType = 'line',
	timeFormat = null,
	includePrevious = false,
	softMax = undefined
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [readings, setReadings] = useState([]);
	const [readingsPrevious, setPreviousReadings] = useState([]);
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(WATER_EXCHANGES_CHART, {
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
			}
		},
		fetchPolicy: 'cache-and-network'
	});

	useEffect(() => {
		if (!called && entry.intersectionRatio >= 0.2) {
			loadReadings();
		}
	}, [entry, called, loadReadings]);

	useEffect(() => {
		if (data) {
			setReadings(data.waterExchanges.map(exchange => ({
				...exchange,
				label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
			})));

			if (data.waterExchangesPrevious) {
				setPreviousReadings(data.waterExchangesPrevious.map(exchange => ({
					...exchange,
					label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
				})));
			}
		}
	}, [data, setReadings, timeFormat]);

	if (loading) return <SkeletonChart />;
	if (error) return <Message type="error">{error.message}</Message>;

	return (
		<div ref={setRefContainer}>
			{!called && <Button onClick={loadReadings}>Load chart</Button>}
			{loading && <SkeletonChart />}
			{error && <Message type="error">{error.message}</Message>}
			{readings.length > 0 &&
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
								text: unit === 'LITER' ? 'liter' : ''
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
							showInLegend: includePrevious,
							data: readings.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.received]),
							color: 'var(--color-water)'
						},
						].concat(readingsPrevious.length > 0 ? [{
							name: 'Previously received',
							showInLegend: true,
							type: chartType,
							data: readingsPrevious.map(usage => [timeFormat ? usage.label : (usage.period.end + (end - start)) * 1000, usage.received]),
							color: 'hsla(var(--color-water-h), var(--color-water-s), var(--color-water-l), .3)'
						}] : []).reverse()
					}}
				/>}
			{called && !loading && readings.length <= 0 && <Message>No data</Message>}
		</div>
	);
}