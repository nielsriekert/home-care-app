import React, { useEffect } from 'react';
import styles from './CurrentSolarPowerGenerating.module.css';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';

import { useQuery, gql } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

const CURRENT_SOLAR_POWER_GENERATING = gql`
	query solarPowerGenerated {
		currentSolarPowerGenerating {
			received(unit: WATT),
			readingAt
		}
	}
`;

export default function CurrentSolarPowerGenerating({ updatedAt }) {
	const { loading, error, data } = useQuery(CURRENT_SOLAR_POWER_GENERATING, {
		pollInterval: 10000
	});

	useEffect(() => {
		if (data?.currentSolarPowerGenerating?.readingAt && typeof updatedAt === 'function') {
			updatedAt(data.currentSolarPowerGenerating.readingAt);
		}
	}, [data, updatedAt]);

	if (error) return <Message type="error">{error.message}</Message>;
	return (
		<div className={styles.container}>
			{!loading ? data?.currentSolarPowerGenerating?.received ?
				<span><FormattedNumber value={data.currentSolarPowerGenerating.received} /> W </span> : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}
