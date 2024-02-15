import styles from './SolarPowerGenerated.module.css';

import Alert from '../../atoms/Alert';
import Skeleton from '../../atoms/Skeleton';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, gql, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const SOLAR_POWER_RECEIVED = gql`
	query solarPowerReceived($start: Int! $end: Int!) {
		solarPowerExchange(start: $start end: $end) {
			received
			period {
				start
				end
			}
		}
	}
`;

export default function SolarPowerGenerated({
	start,
	end,
}: {
	start?: number,
	end?: Number,
}) {
	const { error, data, networkStatus } = useQuery(SOLAR_POWER_RECEIVED, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start: start || 0,
			end: end || 0
		}
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ? data && data.solarPowerExchange ? <ToolTip title="Electricity from the sun"><span><FormattedNumber value={data.solarPowerExchange.received} /> kWh</span></ToolTip> : '-' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
