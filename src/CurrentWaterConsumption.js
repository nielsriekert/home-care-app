import React from 'react';

import { useQuery, gql } from '@apollo/client';

const CURRENT_WATER_CONSUMPTION = gql`
	query currentWaterMeterReading {
		currentWaterMeterReading
	}
`;

export default function CurrentWaterConsumption() {
	const { loading, error, data } = useQuery(CURRENT_WATER_CONSUMPTION, {
		fetchPolicy: 'cache-and-network',
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<div className="current-water-consumption">
			{data.currentWaterMeterReading} l
		</div>
	);
}