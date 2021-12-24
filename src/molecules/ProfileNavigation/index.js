import styles from './ProfileNavigation.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileNavigation() {
	return (
		<nav className={styles.container}>
			<ul>
				<li><Link to="/profile">Profile</Link></li>
			</ul>
		</nav>
	);
}
