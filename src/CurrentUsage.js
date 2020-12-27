import React from 'react';

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
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_USAGE);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<div className="current-usage">
			{data.currentElectricityUsage.received} W
		</div>
	);
}

export default CurrentUsage;