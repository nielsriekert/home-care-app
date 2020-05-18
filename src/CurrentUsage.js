import React from 'react';

import { useQuery, gql } from '@apollo/client';


const CURRENT_ELECTRIC_USAGE = gql`
	query currentElectricityUsage {
		currentElectricityUsage
	}
`;

function CurrentUsage() {
	const { loading, error, data } = useQuery(CURRENT_ELECTRIC_USAGE);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<div>
			Current Electric Usage: {data.currentElectricityUsage} kW (refresh page to refresh)
		</div>
	);
}

export default CurrentUsage;