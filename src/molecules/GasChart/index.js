import React, { useState, useEffect } from 'react';

import { useLazyQuery, gql } from '@apollo/client';

import SkeletonChart from '../SkeletonChart';
import Message from '../../atoms/Message';
import Button from '../../atoms/Button';

import useIntersect from '../../hooks/useIntersect';

import { DateTime } from 'luxon';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GAS_EXCHANGES_CHART = gql`
	query gasExchangesChart(
		$resolution: TimeSpan
		$timePeriod: TimePeriodInput!
	) {
		gasExchanges(resolution: $resolution, timePeriod: $timePeriod) {
			received
			dataPointsCount
			period {
				start
				end
			}
		}
	}
`;

export default function GasChart({
	resolution,
	start,
	end,
	chartType = 'line',
	timeFormat = null,
	softMax = undefined
}) {
	const [setRefContainer, entry] = useIntersect({ threshold: [0.2] });
	const [readings, setReadings] = useState([]);
	const [loadReadings, { called, loading, error, data }] = useLazyQuery(GAS_EXCHANGES_CHART, {
		variables: {
			resolution,
			timePeriod: {
				start,
				end
			},
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
							name:  'm³',
							showInLegend: false,
							type: chartType,
							data: readings.map(usage => [timeFormat ? usage.label : usage.period.end * 1000, usage.received]),
							color: 'hsla(var(--color-gas-h), var(--color-gas-s), var(--color-gas-l), .6)'
						}]
					}}
				/>}
			{called && !loading && readings.length <= 0 && <Message>No data</Message>}
		</div>
	);
}
