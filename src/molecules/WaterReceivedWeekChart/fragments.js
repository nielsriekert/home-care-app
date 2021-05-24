import { gql } from '@apollo/client';

export const EXCHANGE = gql`
	fragment WaterExchange on WaterExchange {
		received
		period {
			start
			end
		}
	}
`;