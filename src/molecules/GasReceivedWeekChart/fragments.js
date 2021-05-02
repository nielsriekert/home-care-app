import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment consumption on GasExchange {
		received
		period {
			start
			end
		}
	}
`;