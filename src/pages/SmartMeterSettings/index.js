import React from 'react';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

import { DateTime } from 'luxon';

import { useQuery, gql } from '@apollo/client';

const SMART_METER_STATISTICS = gql`
	query smartMeterStatistics {
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
	}
`;

export default function SmartMeterSettings() {
	const { loading, error, data } = useQuery(SMART_METER_STATISTICS);

	return (
		<Settings title="Smart Meter">
			{error ?
				<Alert severity="error">{error.message}</Alert> :
				<div>
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
				</div>}
		</Settings>
	);
}