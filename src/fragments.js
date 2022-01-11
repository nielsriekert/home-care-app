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
		using(unit: WATT),
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

export const ELECTRICITY_EXCHANGE_OVER_TIME = gql`
	fragment ElectricityExchangeOverTimeFields on ElectricityExchangeOverTime {
		received(unit: $unit)
		delivered(unit: $unit)
		used(unit: $unit)
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

export const SOLAR_INVERTER = gql`
	fragment SolarInverterFields on SolarInverter {
		id
		name
		ipAddress
		type
		currentPower
		totalYield
	}
`;