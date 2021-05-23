import { gql } from '@apollo/client';

export const CONSUMPTION = gql`
	fragment WaterConsumption on WaterConsumption {
		received
		period {
			start
			end
		}
	}
`;