import styles from './UserMenu.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

import Skeleton from '../../atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const ME = gql`
	query me {
		me {
			name
			email
			avatar
		}
	}
`;

export default function UserMenu({ className }) {
	const { loading, error, data } = useQuery(ME);

	if (error) {
		return <div className="loading">error</div>;
	}

	return (
		<nav className={(className ? ' ' + className : '')}>
			{!loading ?
				<Link to="/profile" className={styles.container + (!data.me.avatar ? ' ' + styles.noImage : '')}>
					{data.me.avatar ? <img src={data.me.avatar} alt={data.me.name} /> : data.me.name}
				</Link> : <Skeleton shape="circle" width="50px" height="50px" />}
		</nav>
	);
}
