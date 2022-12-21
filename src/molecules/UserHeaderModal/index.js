import React from 'react';
import styles from './UserHeaderModal.module.css';

import { useMutation, gql } from '@apollo/client';

import UserHeaderMenu from '../UserHeaderMenu';
import UserProfileCard from '../UserProfileCard';

import { USER } from '../../fragments';

const LOGOUT = gql`
	${USER}
	mutation logout {
		logout {
			...UserFields
		}
	}
`;

export default function UserHeaderModal({ isOpen, name, email, avatar, role }) {
	const [logout] = useMutation(LOGOUT);

	const onLogout = event => {
		event.preventDefault();
		logout().then(() => window.location = '/');
	};

	return (
		<div className={styles.container + (isOpen ? ` ${styles.isOpen}` : '')}>
			<UserProfileCard name={name} email={email} avatar={avatar} />
			<UserHeaderMenu items={[
				{
					id: 1,
					url: '/profile/',
					label: 'Profile',
					access: []
				},
				{
					id: 2,
					url: '/events/',
					label: 'Events',
					access: []
				},
				{
					id: 3,
					onClick: onLogout,
					label: 'Log out',
					access: []
				}
			].filter(item => item.access.indexOf(role) >= 0 || item.access.length <= 0)}
			/>
		</div>
	);
}
