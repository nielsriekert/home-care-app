import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment GasExchange on GasExchange {
		received
		period {
			start
			end
		}
	}
`;