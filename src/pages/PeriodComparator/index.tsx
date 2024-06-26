import styles from './PeriodComparator.module.css';
import { useState, useEffect } from 'react';

import { DateTime, DateTimeUnit } from 'luxon';

import { useLazyQuery } from '@apollo/client';
import { useIntl, FormattedNumber } from 'react-intl';

import Default from '../../templates/Default';

import SelectField from '../../molecules/SelectField';

import Alert from '../../atoms/Alert';
import Label from '../../atoms/Label';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { graphql } from '../../types/graphql';

export const PeriodComparator_Query = graphql(`#graphql
	query periodComparator(
		$start: Int!
		$end: Int!
		$startPrevious: Int!
		$endPrevious: Int!
		$includeSolar: Boolean!
	) {
		electricityExchange(start: $start end: $end) {
			id
			received
			delivered
			used
			ofUsedIsSolar
			percentageOfUsedIsSolar
			period {
				start
				end
			}
		}

		solarPowerExchange(start: $start end: $end) @include(if: $includeSolar) {
			id
			received
			period {
				start
				end
			}
		}

		gasExchange(start: $start end: $end) {
			id
			received
			period {
				start
				end
			}
		}

		waterExchange(start: $start end: $end) {
			id
			received
			delivered
			period {
				start
				end
			}
		}

		electricityExchangePrevious: electricityExchange(start: $startPrevious end: $endPrevious) {
			id
			received
			delivered
			used
			ofUsedIsSolar
			percentageOfUsedIsSolar
			period {
				start
				end
			}
		}

		solarPowerExchangePrevious: solarPowerExchange(start: $startPrevious end: $endPrevious) @include(if: $includeSolar) {
			id
			received
			period {
				start
				end
			}
		}

		gasExchangePrevious: gasExchange(start: $startPrevious end: $endPrevious) {
			id
			received
			period {
				start
				end
			}
		}

		waterExchangePrevious: waterExchange(start: $startPrevious end: $endPrevious) {
			id
			received
			period {
				start
				end
			}
		}
	}
`);

export default function PeriodComparator({ hasSolarInverter = false }) {
	const [fetch, { data, loading, error }] = useLazyQuery(PeriodComparator_Query);
	const [yearsInThePast, setYearsInThePast] = useState<number>(1);
	const [period, setPeriod] = useState<DateTimeUnit>('year');
	const intl = useIntl();

	useEffect(() => {
		fetch({
			variables: {
				start: DateTime.now().startOf(period).toUnixInteger(),
				end: DateTime.now().endOf('hour').toUnixInteger(),
				startPrevious: DateTime.now().minus({ year: yearsInThePast }).startOf(period).toUnixInteger(),
				endPrevious: DateTime.now().minus({ year: yearsInThePast }).endOf('hour').toUnixInteger(),
				includeSolar: hasSolarInverter,
			}
		});
	}, [fetch, period, yearsInThePast, hasSolarInverter]);

	const currentYear = data?.electricityExchange ?? null;
	const previousYear = data?.electricityExchangePrevious ?? null;
	const currentYearSolar = data?.solarPowerExchange ?? null;
	const previousYearSolar = data?.solarPowerExchangePrevious ?? null;
	const currentYearGas = data?.gasExchange ?? null;
	const previousYearGas = data?.gasExchangePrevious ?? null;
	const currentYearWater = data?.waterExchange ?? null;
	const previousYearWater = data?.waterExchangePrevious ?? null;

	return (
		<Default title="Period comparator">
			<div className={styles.settings}>
				<SelectField
					label="Previous year to compare"
					name="compare-year"
					value={yearsInThePast.toString()}
					choices={[// should be dynamic, based on available data
						{
							label: DateTime.now().minus({ year: 1 }).year.toString(),
							value: '1'
						},
						{
							label: DateTime.now().minus({ year: 2 }).year.toString(),
							value: '2'
						},
						{
							label: DateTime.now().minus({ year: 3 }).year.toString(),
							value: '3'
						},
						{
							label: DateTime.now().minus({ year: 4 }).year.toString(),
							value: '4'
						}
					]}
					onChange={(name, value) => setYearsInThePast(parseInt(value))}
				/>
				<SelectField
					label="Period to compare"
					name="period"
					value={period}
					choices={[
						{
							label: 'Year',
							value: 'year'
						},
						{
							label: 'Quarter',
							value: 'quarter'
						},
						{
							label: 'Month',
							value: 'month'
						},
						{
							label: 'Day',
							value: 'day'
						}
					]}
					onChange={(name, value) => setPeriod(value as DateTimeUnit)}
					description="Compare the selected period for the current year with a previous year starting from today."
				/>
			</div>
			{error && <Alert severity="error">{error.message}</Alert>}
			{!loading && !data && <Alert>No data found</Alert>}
			{loading && <LoadingSpinner />}
			{data && <table className={styles.table}>
				<thead>
					<tr>
						<th></th>
						<th>
							{previousYear && <>
								{DateTime.fromSeconds(previousYear.period.start).year}
								<br />
								{DateTime.fromSeconds(previousYear.period.start).toLocaleString({ day: 'numeric', month: 'short' })} to {DateTime.fromSeconds(previousYear.period.end).toLocaleString({ day: 'numeric', month: 'short' })}
							</>}
						</th>
						<th>
							{currentYear && <>
								{DateTime.fromSeconds(currentYear.period.start).year}
								<br />
								{DateTime.fromSeconds(currentYear.period.start).toLocaleString({ day: 'numeric', month: 'short' })} to {DateTime.fromSeconds(currentYear.period.end).toLocaleString({ day: 'numeric', month: 'short' })}
							</>}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className={styles.tableReceived}>
						<th>Electricity received</th>
						<td>
							{previousYear && <>
								<FormattedNumber value={previousYear.received} /> kWh
							</>}
						</td>
						<td>
							{currentYear && <>
								<FormattedNumber value={currentYear.received} /> kWh
							</>}
						</td>
					</tr>
					<tr className={styles.tableDelivered}>
						<th>Electricity delivered</th>
						<td>
							{previousYear && <>
								<FormattedNumber value={previousYear.delivered} /> kWh
							</>}
						</td>
						<td>
							{currentYear && <>
								<FormattedNumber value={currentYear.delivered} /> kWh
							</>}
						</td>
					</tr>
					<tr className={styles.tableUsed}>
						<th>Electricity used</th>
						<td>
							{previousYear && <>
								<FormattedNumber value={previousYear.used} /> kWh <Label type="solar"><FormattedNumber value={previousYear.percentageOfUsedIsSolar} /> %</Label>
							</>}
						</td>
						<td>
							{currentYear && <>
								<FormattedNumber value={currentYear.used} /> kWh <Label type="solar" title={`${intl.formatNumber(currentYear.ofUsedIsSolar)} kWh`}><FormattedNumber value={currentYear.percentageOfUsedIsSolar} /> %</Label>
							</>}
						</td>
					</tr>
					{hasSolarInverter && <tr className={styles.tableSolar}>
						<th>Solar</th>
						<td>
							{previousYearSolar && <>
								<FormattedNumber value={previousYearSolar.received} /> kWh
							</>}
						</td>
						<td>
							{currentYearSolar && <>
								<FormattedNumber value={currentYearSolar.received} /> kWh
							</>}
						</td>
					</tr>}
					<tr className={styles.tableGas}>
						<th>Gas</th>
						<td>
							{previousYearGas && <>
								<FormattedNumber value={previousYearGas.received} /> m³
							</>}
						</td>
						<td>
							{currentYearGas && <>
								<FormattedNumber value={currentYearGas.received} /> m³
							</>}
						</td>
					</tr>
					<tr className={styles.tableWater}>
						<th>Water</th>
						<td>
							{previousYearWater && <>
								<FormattedNumber value={previousYearWater.received} /> l
							</>}
						</td>
						<td>
							{currentYearWater && <>
								<FormattedNumber value={currentYearWater.received} /> l
							</>}
						</td>
					</tr>
				</tbody>
			</table>}
		</Default>
	);
}
