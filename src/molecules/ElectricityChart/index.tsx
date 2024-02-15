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
import { TimeSpan, ElectricEnergyOverTimeUnit, ElectricityExchangesChartQuery, SolarExchangesChartQuery } from '../../types/graphql/graphql';

const ElectricExchangesChart_Query = graphql(`
	query electricityExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
		$includePrevious: Boolean!
		$unit: ElectricEnergyOverTimeUnit
	) {
		electricityExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received(unit: $unit)
			delivered(unit: $unit)
			dataPointsCount
			period {
				start
				end
			}
		}

		electricityExchangesPrevious: electricityExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			received(unit: $unit)
			delivered(unit: $unit)
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`);

const SolarPowerExchangesChart_Query = graphql(`
	query solarExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
		$timePeriodPrevious: TimePeriodInput!
		$unit: ElectricEnergyOverTimeUnit
		$includePrevious: Boolean!
	) {
		solarExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received(unit: $unit)
			period {
				start
				end
			}
		}

		solarExchangesPrevious: solarExchanges(resolution: $resolution, timePeriod: $timePeriodPrevious) @include(if: $includePrevious) {
			received(unit: $unit)
			period {
				start
				end
			}
		}
	}
`);

const getExchangeLabel = (
	exchange: ElectricityExchangesChartQuery['electricityExchanges'][0] | SolarExchangesChartQuery['solarExchanges'][0],
	timeFormat: DateTimeFormatOptions
) => {
	return exchange ? DateTime.fromSeconds(exchange?.period.start).toLocaleString(timeFormat) : null;
};

export default function ElectricityChart({
	resolution,
	end,
	duration,
	unit = ElectricEnergyOverTimeUnit.KilowattHour,
	chartType = 'line',
	timeFormat = null,
	includePrevious = false,
	softMax = undefined,
	includeSolarPower = false
} : {
	resolution: TimeSpan,
	end: DateTime,
	duration: Duration,
	unit?: ElectricEnergyOverTimeUnit,
	chartType?: 'line' | 'column' | 'area',
	timeFormat?: DateTimeFormatOptions | null,
	includePrevious?: boolean
	softMax?: number,
	includeSolarPower?: boolean
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(ElectricExchangesChart_Query, {
		variables: {
			resolution,
			timePeriod: {
				start: end.minus(duration).toUnixInteger(),
				end: end.toUnixInteger(),
			},
			includePrevious,
			timePeriodPrevious: {
				start: end.minus(duration).minus(duration).toUnixInteger(),
				end: end.minus(duration).toUnixInteger(),
			},
			unit
		},
		fetchPolicy: 'cache-and-network'
	});
	const [loadSolarReadings, { loading: loadingSolar, error: errorSolar, data: dataSolar }] = useLazyQuery(SolarPowerExchangesChart_Query, {
		variables: {
			resolution,
			timePeriod: {
				start: end.minus(duration).toUnixInteger(),
				end: end.toUnixInteger(),
			},
			includePrevious,
			timePeriodPrevious: {
				start: end.minus(duration).minus(duration).toUnixInteger(),
				end: end.minus(duration).toUnixInteger(),
			},
			unit
		},
		fetchPolicy: 'cache-and-network'
	});

	useEffect(() => {
		if (!called && entry && entry.intersectionRatio >= 0.2) {
			loadReadings();
			if (includeSolarPower) {
				loadSolarReadings();
			}
		}
	}, [entry, called, loadReadings, includeSolarPower, loadSolarReadings]);

	if (loading) return <SkeletonChart />;

	return (
		<div ref={setRefContainer}>
			{!called && <Button onClick={loadReadings}>Load chart</Button>}
			{loading && (!includeSolarPower || loadingSolar) && <SkeletonChart />}
			{error && <Alert severity="error">{error.message}</Alert>}
			{errorSolar && <Alert severity="error">{errorSolar.message}</Alert>}
			{data && data.electricityExchanges.length > 0 && (!includeSolarPower || !loadingSolar) &&
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
							categories: timeFormat ? data.electricityExchanges.map(reading => getExchangeLabel(reading, timeFormat)) : undefined,
							lineColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							tickColor: 'hsla(var(--color-secondary-shade-3-h), var(--color-secondary-shade-3-s), var(--color-secondary-shade-3-l), .4)',
							plotBands: data.electricityExchanges.filter(reading => reading?.dataPointsCount === 0).map(reading => ({
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
							data: data.electricityExchanges.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.end * 1000, usage.received]),
							color: 'var(--color-electricity-received)'
						},
						{
							name: 'Delivered',
							type: chartType,
							showInLegend: includePrevious || includeSolarPower,
							data: data.electricityExchanges.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.end * 1000, usage.delivered]),
							color: 'var(--color-electricity-delivered)'
						}].concat(
							dataSolar && dataSolar.solarExchanges.length > 0 ? [{
								name: 'Solar received',
								showInLegend: true,
								type: chartType,
								data: dataSolar.solarExchanges.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.end * 1000, usage.received]),
								color: 'var(--color-electricity-solar)'
							}] : []
						).concat(data.electricityExchangesPrevious && data.electricityExchangesPrevious.length > 0 ? [{
							name: 'Previously received',
							showInLegend: true,
							type: chartType,
							data: data.electricityExchangesPrevious.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.start, usage.received]),
							color: 'hsla(var(--color-electricity-received-h), var(--color-electricity-received-s), var(--color-electricity-received-l), .3)'
						},
						{
							name: 'Previously delivered',
							showInLegend: true,
							type: chartType,
							data: data.electricityExchangesPrevious.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.start, usage.delivered]),
							color: 'hsla(var(--color-electricity-delivered-h), var(--color-electricity-delivered-s), var(--color-electricity-delivered-l), .3)'
						}] : []).concat(
							dataSolar?.solarExchangesPrevious && dataSolar.solarExchangesPrevious.length > 0 ? [{
								name: 'Previously solar received',
								showInLegend: true,
								type: chartType,
								data: dataSolar.solarExchangesPrevious.map(usage => [timeFormat ? getExchangeLabel(usage, timeFormat) : usage.period.end * 1000, usage.received]),
								color: 'hsla(var(--color-electricity-solar-h), var(--color-electricity-solar-s), var(--color-electricity-solar-l), .3)'
							}] : []
						).reverse()
					}}
				/>}
			{called && !loading && data && data.electricityExchanges.length <= 0 && <Alert>No data</Alert>}
		</div>
	);
}
