import { useEffect, useState } from 'react';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

import InputFieldToggle from '../../molecules/InputFieldToggle';

import { DateTime } from 'luxon';

import { useQuery, useMutation } from '@apollo/client';

import { graphql } from '../../types/graphql';
import { SmartMeterStatisticsAndIsRemoveOldDataQuery, SetRemoveOldDataMutation } from '../../types/graphql/graphql';

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
			removeHighResolutionElectricityReadingsOlderThenOneYear
		}
	}
`);

const getSyncStateFromApi = (queryData?: SmartMeterStatisticsAndIsRemoveOldDataQuery, mutateData?: SetRemoveOldDataMutation | null) => (
	typeof mutateData === 'undefined' ? (queryData && queryData.settings.removeHighResolutionElectricityReadingsOlderThenOneYear) === true : mutateData?.setSettings?.removeHighResolutionElectricityReadingsOlderThenOneYear === true
);

export default function SmartMeterSettings() {
	const { loading, error, data } = useQuery(SmartMeter_Query);
	const [isChecked, setChecked] = useState(false);
	const [setRemoving, { loading: loadingSet, error: errorSet, data: dataSet }] = useMutation(RemoveOldData_Mutation);

	useEffect(() => {
		setChecked(getSyncStateFromApi(data, dataSet));
	}, [data, dataSet]);

	return (
		<Settings title="Smart Meter">
			<h2>Data retention</h2>
			{error && <Alert severity="error">{error?.message}</Alert>}
			{errorSet && <Alert severity="error">{errorSet?.message}</Alert>}
			<InputFieldToggle
				label="Remove one year old reading data"
				name="remove-one-year-old-reading-data"
				checked={isChecked}
				loading={loadingSet}
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