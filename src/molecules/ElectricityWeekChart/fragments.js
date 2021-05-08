import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment consumption on ElectricityExchange {
		received
		delivered
		period {
			start
			end
		}
	}
`;