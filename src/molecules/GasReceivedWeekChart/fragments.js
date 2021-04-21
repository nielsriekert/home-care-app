import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment consumption on GasConsumption {
		received
		period {
			start
			end
		}
	}
`;