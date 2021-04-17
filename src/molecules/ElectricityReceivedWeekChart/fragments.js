import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment consumption on ElectricityConsumption {
		received
		delivered
		period {
			start
			end
		}
	}
`;