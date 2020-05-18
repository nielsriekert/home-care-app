import React from 'react';
import './App.css';

import CurrentUsage from './CurrentUsage';

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
console.log(process.env.API_ENDPOINT);
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.REACT_APP_API_ENDPOINT,
	})
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<header className="App-header">
					<h1>Home Care</h1>
					<CurrentUsage />
				</header>
			</div>
		</ApolloProvider>
	);
}

export default App;
