import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment ElectricityExchange on ElectricityExchange {
		received
		delivered
		period {
			start
			end
		}
	}
`;