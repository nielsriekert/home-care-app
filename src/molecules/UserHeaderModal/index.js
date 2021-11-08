import React, { useEffect } from 'react';
import styles from './UserHeaderModal.module.css';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import UserHeaderMenu from '../UserHeaderMenu';
import UserProfileCard from '../UserProfileCard';

import useCookie from '../../hooks/useCookie';

export default function UserHeaderModal({ isOpen, name, email, avatar, role }) {
	const history = useHistory();
	const [accessToken, setCookie] = useCookie('authorization-token', null);
	const client = useApolloClient();

	const onLogout = event => {
		event.preventDefault();
		setCookie(null, 0);
	};

	useEffect(() => {
		if (!accessToken) {
			client.clearStore().then(() => {
				// TODO: not the best solution...
				window.location = '/';
			});
		}
	}, [accessToken, client, history]);

	return (
		<div className={styles.container + (isOpen ? ` ${styles.isOpen}` : '')}>
			<UserProfileCard name={name} email={email} avatar={avatar} />
			<UserHeaderMenu items={[
				{
					id: 1,
					url: '/profile/',
					label: 'Events',
					access: []
				},
				{
					id: 5,
					onClick: onLogout,
					label: 'Uitloggen',
					access: []
				}
			].filter(item => item.access.indexOf(role) >= 0 || item.access.length <= 0)}
			/>
		</div>
	);
}
