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

export default new ApolloClient({
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getEvents: {
						// Don't cache separate results based on
						// any of this field's arguments.
						keyArgs: false,
						// Concatenate the incoming list items with
						// the existing list items.
						merge(existing = [], incoming) {
							const existingEventResults = Array.isArray(existing.eventResults) ? existing.eventResults : [];
							return {
								...incoming,
								eventResults: [...existingEventResults, ...incoming.eventResults]
							};
						},
					}
				}
			}
		  }
	}),
	link: from([errorLink, httpLink]),
	connectToDevTools: process.env.NODE_ENV !== 'production'
});
