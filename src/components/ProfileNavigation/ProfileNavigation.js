import './profile-navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<nav className="profile-navigation-container">
			<ul>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/minder-gas-nl">MinderGas.nl</Link></li>
			</ul>
		</nav>
	);
}

export default Navigation;