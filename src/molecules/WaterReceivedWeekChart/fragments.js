import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment consumption on WaterConsumption {
		received
		period {
			start
			end
		}
	}
`;