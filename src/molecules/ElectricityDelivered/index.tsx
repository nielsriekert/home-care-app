import styles from './ElectricityDelivered.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const TodayElectricityDelivered_Query = graphql(`#graphql
	query todayElectricityExchangeDelivered {
		todayElectricityExchange {
			delivered
		}
	}
`);

export default function ElectricityDelivered() {
	const { data, error, networkStatus } = useQuery(TodayElectricityDelivered_Query, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ?
				data && data.todayElectricityExchange ?
					<ToolTip title="Electricity delivered to the grid"><span><FormattedNumber value={data.todayElectricityExchange.delivered} /> kWh</span></ToolTip> :
					0 + ' kWh' :
				<Skeleton width="3em" />}
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
