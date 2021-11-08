import { gql } from '@apollo/client';

export const USER = gql`
	fragment UserFields on User {
		name
		email
		avatar
	}
`;