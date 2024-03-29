import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors) {
	  	graphQLErrors.forEach(({ extensions }) => {
			if (extensions.code === 'UNAUTHENTICATED') {
				window.location = '/login';
			}
		});
	}
});

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_API_ENDPOINT,
	credentials: 'include'
});

const apolloClient = new ApolloClient({
	cache: new InMemoryCache({
		possibleTypes: {
			ConnectionRelay: [
				'EventConnectionRelay',
			],
		},
	}),
	link: from([errorLink, httpLink]),
	connectToDevTools: process.env.NODE_ENV !== 'production'
});


export default apolloClient;