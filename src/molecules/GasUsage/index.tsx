import styles from './GasUsage.module.css';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import ToolTip from '../../atoms/ToolTip';
import LoadingSpinner from '../../atoms/LoadingSpinner';

import { useQuery, NetworkStatus } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import { graphql } from '../../types/graphql';

const GasConsumption_Query = graphql(`#graphql
	query gasExchange($start: Int! $end: Int!) {
		gasExchange(start: $start end: $end) {
			received
			period {
				start
				end
			}
		}
	}
`);

export default function GasUsage({
	start,
	end,
}: {
	start: number,
	end: number,
}) {
	const { data, error, networkStatus } = useQuery(GasConsumption_Query, {
		pollInterval: 60000 * 5,
		notifyOnNetworkStatusChange: true,
		variables: {
			start,
			end,
		}
	});

	if (error) return <Alert severity="error">{error.message}</Alert>;

	return (
		<div className={styles.container}>
			{NetworkStatus[networkStatus] === 'loading' && <Skeleton width="3em" />}
			{data && <ToolTip title="Gas usage">
				<span>
					<FormattedNumber value={data.gasExchange.received} /> m³
				</span>
			</ToolTip>}
			<LoadingSpinner isHidden={networkStatus !== NetworkStatus.poll} diameter="16px" borderWidth="3px" />
		</div>
	);
}
