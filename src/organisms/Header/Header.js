import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import UserMenu from '../../components/UserMenu/UserMenu';
// import Navigation from '../Navigation/Navigation';

function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.main}>
				<Link to="/" className={styles.appName}>Home Care</Link>
				<UserMenu className={styles.userMenu} />
			</div>
			{/* <div className="header-navigation-container">
				<Navigation />
			</div> */}
		</header>
	);
}

export default Header;