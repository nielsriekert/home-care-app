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