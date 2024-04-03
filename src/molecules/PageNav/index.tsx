import styles from './PageNav.module.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface MenuItem {
	to: string,
	label: string,
	description: string,
	icon: ReactNode,
}

export default function PageNav({
	menuItems = [],
}: {
	menuItems: MenuItem[],
}) {
	return (
		<nav className={styles.container}>
			{menuItems.map(item => (
				<Link key={item.to} to={item.to}>
					<div className={styles.icon}>
						{item.icon}
					</div>
					<span className={styles.title}>{item.label}</span>
					<span className={styles.description}>{item.description}</span>
				</Link>
			))}
		</nav>
	);
}
