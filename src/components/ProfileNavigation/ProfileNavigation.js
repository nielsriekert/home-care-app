import './profile-navigation.css';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useApolloClient } from '@apollo/client';

import useCookie from '../../hooks/useCookie';

function Navigation() {
	const history = useHistory();
	const [accessToken, setCookie] = useCookie('authorization-token', null);
	const client = useApolloClient();

	const onLogout = event => {
		event.preventDefault();
		setCookie(null, 0);
	};

	useEffect(() => {
		if (!accessToken) {
			client.clearStore().then(() => {
				// TODO: not the best solution...
				window.location = '/';
			});
		}
	}, [accessToken, client, history]);

	return (
		<nav className="profile-navigation-container">
			<ul>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/minder-gas-nl">MinderGas.nl</Link></li>
				<li><button onClick={onLogout}>Logout</button></li>
			</ul>
		</nav>
	);
}

export default Navigation;