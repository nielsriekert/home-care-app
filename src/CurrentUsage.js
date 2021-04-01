import React from 'react';

import Skeleton from './atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const CURRENT_ELECTRIC_USAGE = gql`
	query currentElectricityUsage {
		currentElectricityUsage {
			received(unit: WATT),
			readingAt
		}
	}
`;

function CurrentUsage() {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_USAGE, {
		fetchPolicy: 'cache-and-network',
	});

	if (error) return <p>Error :(</p>;
	return (
		<div className="current-usage">
			{!loading ? data.currentElectricityUsage ? data.currentElectricityUsage.received + ' W' : 0 + ' W' : <Skeleton width="3em" /> }
		</div>
	);
}

export default CurrentUsage;