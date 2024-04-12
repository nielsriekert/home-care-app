import styles from './WaterUsage.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { DateTime } from 'luxon';

import { graphql } from '../../types/graphql';

const WaterUsage_Query = graphql(`#graphql
	query waterExchange($start: Int! $end: Int!) {
		waterExchange(start: $start end: $end) {
			received
		}
	}
`);

export default function WaterUsage({
	start,
	end,
} : {
	start: number,
	end: number,
}) {
	const { data, error, networkStatus } = useQuery(WaterUsage_Query, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start: start || Math.round(DateTime.now().startOf('day').toSeconds()),
			end: end || Math.floor(DateTime.now().endOf('day').toSeconds())
		}
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;

	return (
		<div className={styles.container}>
			{NetworkStatus[networkStatus] === 'loading' && <Skeleton width="3em" />}
			{data && <ToolTip title="Water usage">
				<span>
					<FormattedNumber value={data.waterExchange?.received || 0} style="unit" unit="liter" />
				</span>
			</ToolTip>}
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
