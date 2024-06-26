import styles from './ElectricityUsed.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const ElectricityUsed_Query = graphql(`#graphql
	query electricityUsed($start: Int! $end: Int!) {
		electricityExchange(start: $start end: $end) {
			used
			period {
				start
				end
			}
		}
	}
`);

export default function ElectricityUsed({
	start,
	end,
}: {
	start: number,
	end: number,
}) {
	const { data, error , networkStatus } = useQuery(ElectricityUsed_Query, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start,
			end
		}
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;
	return (
		<div className={styles.container}>
			{networkStatus !== NetworkStatus.loading ?
				typeof data?.electricityExchange?.used === 'number' ?
					<ToolTip title="Electricity used at home"><span><FormattedNumber value={data.electricityExchange.used} /> kWh</span></ToolTip> :
					<ToolTip title="Cannot determinate electricity used at home"><span>-</span></ToolTip> :
				<Skeleton width="3em" /> }
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
