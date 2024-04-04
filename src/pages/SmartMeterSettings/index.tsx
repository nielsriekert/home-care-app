import { useState, useEffect } from 'react';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';

import InputFieldToggle from '../../molecules/InputFieldToggle';

import { DateTime } from 'luxon';

import { useQuery, useMutation, ApolloError } from '@apollo/client';

import { graphql } from '../../types/graphql';

const SmartMeter_Query = graphql(`#graphql
	query smartMeterStatisticsAndIsRemoveOldData {
		smartMeterStatistics {
			dsmrVersion
			equipmentId
			tariffIndicator
			longPowerFailureLog {
				start
				duration
				end
			}
			gasMeterEquipmentId
		}

		settings {
			id
			removeHighResolutionElectricityReadingsOlderThenOneYear
		}
	}
`);

const RemoveOldData_Mutation = graphql(`#graphql
	mutation setRemoveOldData($settings: SettingsInput!) {
		setSettings(settings: $settings) {
			id
			removeHighResolutionElectricityReadingsOlderThenOneYear
		}
	}
`);

export default function SmartMeterSettings() {
	const { loading, error: errorGet, data } = useQuery(SmartMeter_Query, {
		fetchPolicy: 'cache-and-network'
	});
	const [setRemoving, { loading: loadingSet, error: errorSet }] = useMutation(RemoveOldData_Mutation);
	const [error, setError] = useState<ApolloError | undefined>(undefined);

	useEffect(() => {
		setError(errorSet || errorGet);
	}, [errorGet, errorSet]);

	return (
		<Settings title="Smart Meter">
			<h2>Data retention</h2>
			<InputFieldToggle
				label="Remove one year old reading data"
				name="remove-one-year-old-reading-data"
				isDisabled={!data}
				checked={data?.settings.removeHighResolutionElectricityReadingsOlderThenOneYear ?? false}
				loading={loading || loadingSet}
				message={error ? {
					type: 'error',
					content: error.message
				} : undefined}
				description="High resolution data older than 1 year is stripped, this has no effect on statistics, but could have an effect on future features."
				onChange={(name, value) => setRemoving({
					variables: {
						settings: {
							removeHighResolutionElectricityReadingsOlderThenOneYear: value
						}
					}
				})}
			/>
			<div>
				<h2>Statistics</h2>
				<p>
					<strong>DSMR version</strong><br />{loading ? <Skeleton /> : data?.smartMeterStatistics?.dsmrVersion ?? '-'}
				</p>
				<p>
					<strong>Equipment identifier</strong><br />{loading ? <Skeleton /> : data?.smartMeterStatistics?.equipmentId ?? '-'}<br />
				</p>
				<p>
					<strong>Tariff indicator</strong><br /> {loading ? <Skeleton /> : data?.smartMeterStatistics?.tariffIndicator ?? '-'}
				</p>
				<p>
					<strong>Long power failure log</strong><br />
					{loading ? <Skeleton /> : data?.smartMeterStatistics?.longPowerFailureLog ?
						data.smartMeterStatistics.longPowerFailureLog.length > 0 ?
							data.smartMeterStatistics.longPowerFailureLog.map(log => (
								<p key={log.start}>
									<strong>Start</strong> {DateTime.fromSeconds(log.start).toLocaleString(DateTime.DATETIME_FULL)}<br />
									<strong>Duration</strong> {log.duration} seconds<br />
									<strong>End</strong> {DateTime.fromSeconds(log.end).toLocaleString(DateTime.DATETIME_FULL)}
								</p>
							))
							: <p>No log records found</p>
						: '-'}
				</p>
				<p>
					<strong>Gas equipment identifier</strong><br /> {loading ? <Skeleton /> : data?.smartMeterStatistics?.gasMeterEquipmentId ?? '-'}
				</p>
			</div>
		</Settings>
	);
}