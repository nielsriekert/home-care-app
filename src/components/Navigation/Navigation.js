import './navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<nav className="navigation-container">
			<ul>
				<li><Link to="/consumption">Consumption</Link></li>
				<li><Link to="/rooms">Rooms</Link></li>
			</ul>
		</nav>
	);
}

export default Navigation;