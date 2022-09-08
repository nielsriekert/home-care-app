// @ts-check
import React from 'react';
import styles from './Paging.module.css';

import { Link } from 'react-router-dom';

export default function Paging({ currentCount, totalCount, pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor } }) {
	return (
		<div className={styles.container}>
			<div className={styles.results}>
				Shows {currentCount} of {totalCount} result{currentCount > 1 ? 's' : ''}
			</div>
			<nav className={styles.nav}>
				<Link to={{
					search: `?before=${startCursor}`
				}}
				onClick={!hasPreviousPage ? (e) => {e.preventDefault();} : undefined} className={!hasPreviousPage ? styles.disabled : undefined}
				>‹</Link>
				<Link
					to={{
						search: `?after=${endCursor}`
					}}
					onClick={!hasNextPage ? (e) => {e.preventDefault();} : undefined} className={!hasNextPage ? styles.disabled : undefined}
				>›</Link>
			</nav>
		</div>
	);
}
