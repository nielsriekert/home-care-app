import styles from './ElectricityReceived.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const TodayElectricityReceived_Query = graphql(`#graphql
	query todayElectricityExchangeReceived {
		todayElectricityExchange {
			received
		}
	}
`);

export default function ElectricityReceived() {
	const { error, data, networkStatus } = useQuery(TodayElectricityReceived_Query, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ? data?.todayElectricityExchange ? <ToolTip title="Electricity received from the grid"><span><FormattedNumber value={data.todayElectricityExchange.received} /> kWh</span></ToolTip> : 0 + ' kWh' : <Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
