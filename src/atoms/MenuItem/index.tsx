import styles from './MenuItem.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

export default function MenuItem({
	children,
	onClick,
	href
}: {
	children: React.ReactNode,
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	href?: URL | string,
}) {
	return href ?
		<Link to={href} className={styles.container}>{children}</Link> :
		<button className={styles.container} onClick={onClick}>{children}</button>;
}