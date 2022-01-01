import { gql } from '@apollo/client';

export const USER = gql`
	fragment UserFields on User {
		id
		name
		email
		avatar
	}
`;