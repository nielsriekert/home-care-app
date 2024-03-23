import styles from './PeriodComparator.module.css';
import { DateTime } from 'luxon';

import { useQuery } from '@apollo/client';

import { FormattedNumber } from 'react-intl';

import Default from '../../templates/Default';

import Alert from '../../atoms/Alert';

import { graphql } from '../../types/graphql';
import LoadingSpinner from '../../atoms/LoadingSpinner';

export const ElectricityPeriodComparator_Query = graphql(`#graphql
	query electricityPeriodComparator(
		$start: Int!
		$end: Int!
		$startPrevious: Int!
		$endPrevious: Int!
		$includeSolar: Boolean!
	) {
		electricityExchange(start: $start end: $end) {
			received
			delivered
			dataPointsCount
			period {
				start
				end
			}
		}

		solarPowerExchange(start: $start end: $end) @include(if: $includeSolar) {
			received
			period {
				start
				end
			}
		}

		electricityExchangePrevious: electricityExchange(start: $startPrevious end: $endPrevious) {
			received
			delivered
			dataPointsCount
			period {
				start
				end
			}
		}

		solarPowerExchangePrevious: solarPowerExchange(start: $startPrevious end: $endPrevious) @include(if: $includeSolar) {
			received
			period {
				start
				end
			}
		}
	}
`);

export default function PeriodComparator({ hasSolarInverter = false }) {
	const { data, loading, error } = useQuery(ElectricityPeriodComparator_Query, {
		variables: {
			start: DateTime.now().startOf('year').toUnixInteger(),
			end: DateTime.now().toUnixInteger(),
			startPrevious: DateTime.now().minus({ year: 1 }).startOf('year').toUnixInteger(),
			endPrevious: DateTime.now().minus({ year: 1 }).toUnixInteger(),
			includeSolar: hasSolarInverter,
		}
	});

	const currentYear = data?.electricityExchange ?? null;
	const previousYear = data?.electricityExchangePrevious ?? null;
	const currentYearSolar = data?.solarPowerExchange ?? null;
	const previousYearSolar = data?.solarPowerExchangePrevious ?? null;

	return (
		<Default title="Period comparator">
			{error && <Alert severity="error">{error.message}</Alert>}
			{!loading && !data && <Alert>No data found</Alert>}
			{loading && <LoadingSpinner />}
			{data && <table className={styles.table}>
				<thead>
					<tr>
						<th></th>
						<th>
							{previousYearSolar && <>
								{DateTime.fromSeconds(previousYearSolar.period.start).year}
								<br />
								{DateTime.fromSeconds(previousYearSolar.period.start).toLocaleString({ day: 'numeric', month: 'short' })} to {DateTime.fromSeconds(previousYearSolar.period.end).toLocaleString({ day: 'numeric', month: 'short' })}
							</>}
						</th>
						<th>
							{currentYearSolar && <>
								{DateTime.fromSeconds(currentYearSolar.period.start).year}
								<br />
								{DateTime.fromSeconds(currentYearSolar.period.start).toLocaleString({ day: 'numeric', month: 'short' })} to {DateTime.fromSeconds(currentYearSolar.period.end).toLocaleString({ day: 'numeric', month: 'short' })}
							</>}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className={styles.tableReceived}>
						<th>Received</th>
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
						<th>Delivered</th>
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
					{hasSolarInverter && <tr className={styles.tableSolar}>
						<th>Solar received</th>
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
				</tbody>
			</table>}
		</Default>
	);
}
