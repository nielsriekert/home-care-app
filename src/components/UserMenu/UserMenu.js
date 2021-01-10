import './user-menu.css';
import React from 'react';
import { Link } from 'react-router-dom';

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

function UserMenu() {
	const { loading, error, data } = useQuery(ME);

	if (loading) {
		return <div className="loading">loading</div>;
	}

	if (error || !data.me) {
		return <div className="loading">error</div>;
	}

	return (
		<nav className="user-menu-container">
			<Link to="/profile" className={'user-avatar-container' + (!data.me.avatar ? ' contains-no-image' : '')}>
				{data.me.avatar ? <img src={data.me.avatar} alt={data.me.name} /> : data.me.name}
			</Link>
		</nav>
	);
}

export default UserMenu;