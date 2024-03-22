import React from 'react';
import styles from './Paging.module.css';

import { Link } from 'react-router-dom';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql/gql';

const PagingFragment = graphql(`#graphql
	fragment PagingFragment on ConnectionRelay {
		totalCount
		pageInfo {
			hasNextPage
			hasPreviousPage
			startCursor
			endCursor
		}
	}
`);

export default function Paging({
	currentCount,
	connection,
}: {
	currentCount: number,
	connection: FragmentType<typeof PagingFragment>,
}) {
	const { totalCount, pageInfo } = useFragment(PagingFragment, connection);

	return (
		<div className={styles.container}>
			<div className={styles.results}>
				Shows {currentCount} of {totalCount} result{currentCount > 1 ? 's' : ''}
			</div>
			<nav className={styles.nav}>
				<Link to={{
					search: `?before=${pageInfo.startCursor}`
				}}
				onClick={!pageInfo.hasPreviousPage ? (e) => {e.preventDefault();} : undefined} className={!pageInfo.hasPreviousPage ? styles.disabled : undefined}
				>‹</Link>
				<Link
					to={{
						search: `?after=${pageInfo.endCursor}`
					}}
					onClick={!pageInfo.hasNextPage ? (e) => {e.preventDefault();} : undefined} className={!pageInfo.hasNextPage ? styles.disabled : undefined}
				>›</Link>
			</nav>
		</div>
	);
}
