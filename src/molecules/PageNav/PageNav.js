import styles from './PageNav.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNav({ menuItems = [] }) {
	return (
		<nav className={styles.container}>
			{menuItems.map(item => (
				<Link key={item.to} to={item.to}>
					<div className={styles.icon}>
						<item.icon />
					</div>
					<span className={styles.title}>{item.label}</span>
					<span className={styles.description}>{item.description}</span>
				</Link>
			))}
		</nav>
	);
}
