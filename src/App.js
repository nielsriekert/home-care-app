import React from 'react';

import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Cookies from 'cookies.js';

import Login from './pages/Login/Login';
import Portal from './pages/Portal/Portal';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import ProfileDashboard from './pages/ProfileDashboard/ProfileDashboard';
import MinderGasNlSettings from './pages/MinderGasNlSettings/MinderGasNlSettings';
import WaterReaderSettings from './pages/WaterReaderSettings/WaterReaderSettings';
import About from './pages/About/About';
import FourOFour from './pages/FourOFour/FourOFour';

// TODO: doesn't work after logging in
const authLink = new ApolloLink((operation, forward) => {
	const token = Cookies.get('authorization-token');

	// Use the setContext method to set the HTTP headers.
	if (token) {
		operation.setContext({
			headers: {
				authorization: `Bearer ${token}`
			}
		});
	}

	// Call the next link in the middleware chain.
	return forward(operation);
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(new HttpLink({
		uri: process.env.REACT_APP_API_ENDPOINT,
	})),
	connectToDevTools: process.env.NODE_ENV !== 'production'
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			 <Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute redirectComponents={<Portal />} exact path="/">
						<Dashboard />
					</PrivateRoute>
					<PrivateRoute path="/settings">
						<Settings />
					</PrivateRoute>
					<PrivateRoute path="/profile">
						<ProfileDashboard />
					</PrivateRoute>
					<PrivateRoute path="/minder-gas-nl">
						<MinderGasNlSettings />
					</PrivateRoute>
					<PrivateRoute path="/water-reader">
						<WaterReaderSettings />
					</PrivateRoute>
					<PrivateRoute path="/about">
						<About />
					</PrivateRoute>
					<Route>
						<FourOFour />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}
