import { useEffect } from 'react';

import { useLazyQuery } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Alert from '../../atoms/Alert';
import Button from '../../atoms/Button';

import useIntersect from '../../hooks/useIntersect';

import { DateTime, DateTimeFormatOptions, Duration } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { graphql } from '../../types/graphql';
import { TimeSpan, WaterExchangesChartQuery, WaterQuantityUnit } from '../../types/graphql/graphql';

const WaterExchangesChart_Query = graphql(`
	query waterExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
		$includePrevious: Boolean!
	) {
		waterExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received
			dataPointsCount
			period {
				start
				end
			}
		}

		waterExchangesPrevious: waterExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			received
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`);

const getExchangeLabel = (exchange: WaterExchangesChartQuery['waterExchanges'][0], timeFormat: DateTimeFormatOptions) => {
	return DateTime.fromSeconds(exchange?.period.start).toLocaleString(timeFormat);
};

export default function WaterChart({
	resolution,
	end,
	duration,
	unit = WaterQuantityUnit.Liter,
	chartType = 'line',
	timeFormat = null,
	includePrevious = false,
	softMax = undefined
}: {
	resolution: TimeSpan,
	end: DateTime,
	duration: Duration,
	unit?: WaterQuantityUnit,
	chartType?: 'line' | 'column',
	timeFormat?: DateTimeFormatOptions | null,
	includePrevious?: boolean,
	softMax?: number,
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(WaterExchangesChart_Query, {
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
		},
		fetchPolicy: 'cache-and-network'
	});

	useEffect(() => {
		if (!called && entry && entry.intersectionRatio >= 0.2) {
			loadReadings();
		}
	}, [entry, called, loadReadings]);

	if (loading) return <SkeletonChart />;

	return (
		<div ref={setRefContainer}>
			{!called && <Button onClick={() => loadReadings()}>Load chart</Button>}
			{loading && <SkeletonChart />}
			{error && <Alert severity="error">{error.message}</Alert>}
			{data && data.waterExchanges.length > 0 &&
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
							labels: {
								style: {
									color: 'var(--color-secondary-shade-3)'
								}
							},
							type: !timeFormat ? 'datetime' : undefined,
							categories: timeFormat ? data.waterExchanges.map(reading => getExchangeLabel(reading, timeFormat)) : undefined,
							lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							plotBands: data.waterExchanges.filter(reading => reading.dataPointsCount === 0).map(reading => ({
								color: 'hsla(var(--color-secondary-shade-1-h), var(--color-secondary-shade-1-s), var(--color-secondary-shade-1-l), 0.2)',
								from: reading.period.start * 1000,
								to: reading.period.end * 1000
							})),
						},
						yAxis: {
							title: {
								text: unit === 'LITER' ? 'liter' : ''
							},
							labels: {
								style: {
									color: 'var(--color-secondary-shade-3)'
								}
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
							data: data.waterExchanges.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.end * 1000, usage.received]),
							color: 'var(--color-water)'
						},
						].concat(data.waterExchangesPrevious && data.waterExchangesPrevious.length > 0 ? [{
							name: 'Previously received',
							showInLegend: true,
							type: chartType,
							data: data.waterExchangesPrevious.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.start, usage.received]),
							color: 'hsla(var(--color-water-h), var(--color-water-s), var(--color-water-l), .3)'
						}] : []).reverse()
					}}
				/>}
			{called && !loading && data && data.waterExchanges.length <= 0 && <Alert>No data</Alert>}
		</div>
	);
}
