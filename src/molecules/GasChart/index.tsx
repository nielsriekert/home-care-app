import React, { useState, useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Alert from '../../atoms/Alert';
import Button from '../../atoms/Button';

import useIntersect from '../../hooks/useIntersect';

import { DateTime, DateTimeFormatOptions, Duration } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { graphql } from '../../types/graphql/gql.ts';
import { TimeSpan } from '../../types/graphql/graphql.ts';

const GasExchangesChart_Query = graphql(`
	query gasExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
  		$includePrevious: Boolean!
	) {
		gasExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received
			dataPointsCount
			period {
				start
				end
			}
		}

		gasExchangesPrevious: gasExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			received
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`);

export default function GasChart({
	title,
	resolution,
	end,
	duration,
	chartType = 'line',
	timeFormat = null,
	includePrevious = false,
	softMax = undefined,
}: {
	title?: string,
	resolution: TimeSpan,
	end: DateTime,
	duration: Duration,
	chartType?: 'line' | 'column',
	timeFormat?: DateTimeFormatOptions | null,
	includePrevious?: boolean,
	softMax?: number,
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [readings, setReadings] = useState([]);
	const [readingsPrevious, setPreviousReadings] = useState([]);
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(GasExchangesChart_Query, {
		variables: {
			resolution,
			timePeriod: {
				start: end.minus(duration).toUnixInteger(),
				end: end.toUnixInteger()
			},
			includePrevious,
			timePeriodPrevious: {
				start: end.minus(duration).minus(duration).toUnixInteger(),
				end: end.minus(duration).toUnixInteger()
			}
		}
	});

	useEffect(() => {
		if (!called && entry.intersectionRatio >= 0.2) {
			loadReadings();
		}
	}, [entry, called, loadReadings]);

	useEffect(() => {
		if (data) {
			setReadings(data.gasExchanges.map(exchange => ({
				...exchange,
				label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
			})));

			if (data.gasExchangesPrevious) {
				setPreviousReadings(data.gasExchangesPrevious.map(exchange => ({
					...exchange,
					label: timeFormat ? DateTime.fromSeconds(exchange.period.start).toLocaleString(timeFormat) : null
				})));
			}
		}
	}, [data, setReadings, timeFormat]);

	if (loading) return <SkeletonChart />;
	if (error) return <Alert severity="error">{error.message}</Alert>;

	return (
		<div ref={setRefContainer}>
			{!called && <Button onClick={loadReadings}>Load chart</Button>}
			{loading && <SkeletonChart />}
			{error && <Alert severity="error">{error.message}</Alert>}
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
								text: 'm³'
							},
							softMax,
							gridLineColor: 'var(--color-secondary-shade-2)',
						},
						time: {
							useUTC: false
						},
						series: [{
							name:  `Current${title ? ` ${title.toLowerCase()}` : ''}`,
							showInLegend: includePrevious,
							type: chartType,
							data: readings.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.received]),
							color: 'var(--color-gas)'
						}].concat(readingsPrevious.length > 0 ? [{
							name:  `Previous${title ? ` ${title.toLowerCase()}` : ''}`,
							showInLegend: includePrevious,
							type: chartType,
							data: readingsPrevious.map(usage => [timeFormat ? usage.label : (usage.period.end + (end - start)) * 1000, usage.received]),
							color: 'hsla(var(--color-gas-h), var(--color-gas-s), var(--color-gas-l), .4)'
						}] : []).reverse()
					}}
				/>}
			{called && !loading && readings.length <= 0 && <Alert>No data</Alert>}
		</div>
	);
}
