import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';

import UserMenu from '../UserMenu/UserMenu';
// import Navigation from '../Navigation/Navigation';

function Header() {
	return (
		<header className="header-container">
			<div className="header-main-container">
				<Link to="/" className="header-app-name">Home Care</Link>
				<UserMenu />
			</div>
			{/* <div className="header-navigation-container">
				<Navigation />
			</div> */}
		</header>
	);
}

export default Header;