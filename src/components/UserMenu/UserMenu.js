import './user-menu.css';
import React from 'react';

import { useQuery, gql } from '@apollo/client';

const ME = gql`
	query me {
		me {
			name
			email
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
			<button className="user-avatar-container">
				{data.me.name}
			</button>
		</nav>
	);
}

export default UserMenu;