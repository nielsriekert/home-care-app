import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import UserMenu from '../../organisms/UserMenu/UserMenu';

import CogwheelIcon from '../../atoms/CogwheelIcon/CogwheelIcon';

export default function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.main}>
				<div>
					<Link to="/" className={styles.appName}>Home Care</Link>
				</div>
				<Link to="/settings"><CogwheelIcon /></Link>
				<UserMenu className={styles.userMenu} />
			</div>
			{/* <div className="header-navigation-container">
				<Navigation />
			</div> */}
		</header>
	);
}
