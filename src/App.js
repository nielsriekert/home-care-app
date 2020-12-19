import React from 'react';
import './App.css';

import CurrentUsage from './CurrentUsage';
import ElectricityUsage from './ElectricityUsage';
import GasUsage from './GasUsage';
import ElectricityUsageMonth from './ElectricityUsageMonth';

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.HOME_CARE_API_ENDPOINT,
	})
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<header className="App-header">
					<h1>Home Care</h1>
					<CurrentUsage />
					<ElectricityUsage />
					<GasUsage />
					<ElectricityUsageMonth />
				</header>
			</div>
		</ApolloProvider>
	);
}

export default App;
