import React from 'react';
import './App.css';

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.REACT_APP_API_ENDPOINT,
	})
});

function App() {
	return (
		<ApolloProvider client={client}>
			 <Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/">
						<Dashboard />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
