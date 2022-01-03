import { gql } from '@apollo/client';

export const USER = gql`
	fragment UserFields on User {
		id
		name
		email
		avatar
	}
`;

export const ELECTRICITY_USAGE = gql`
	fragment ElectricityUsageFields on ElectricityUsage {
		id
		received(unit: WATT),
		delivered(unit: WATT),
		readingAt
	}
`;

export const ELECTRICITY_EXCHANGE = gql`
	fragment ElectricityExchangeFields on ElectricityExchange {
		received(unit: $unit)
		delivered(unit: $unit)
		dataPointsCount
		period {
			start
			end
		}
	}
`;

export const WATER_EXCHANGE = gql`
	fragment WaterExchangeFields on WaterExchange {
		id
		received
		period {
			start
			end
		}
	}
`;

export const WATER_READING = gql`
	fragment WaterReadingFields on WaterReading {
		id
		reading
		readingAt
		isVerified
	}
`;