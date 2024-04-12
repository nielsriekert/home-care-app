import styles from './UserHeaderModal.module.css';

import { useMutation } from '@apollo/client';

import Menu from '../Menu';
import UserProfileCard from '../UserProfileCard';

import MenuItem from '../../atoms/MenuItem';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql';

const UserHeaderModalFragment = graphql(`#graphql
	fragment UserHeaderModalFragment on User {
		...UserProfileCardFragment
	}
`);

const Logout_Mutation = graphql(`#graphql
	mutation logout {
		logout {
			id
		}
	}
`);

export default function UserHeaderModal({
	user,
	isOpen = false,
}: {
	user: FragmentType<typeof UserHeaderModalFragment>,
	isOpen?: boolean,
}) {
	const userHeader = useFragment(UserHeaderModalFragment, user);

	const [logout] = useMutation(Logout_Mutation);

	const onLogout = event => {
		event.preventDefault();
		logout().then(() => window.location.href = '/');
	};

	return (
		<div className={styles.container + (isOpen ? ` ${styles.isOpen}` : '')}>
			<UserProfileCard user={userHeader} />
			<Menu>
				<MenuItem href="/profile/">
					Profile
				</MenuItem>
				<MenuItem href="/events/">
					Events
				</MenuItem>
				<MenuItem onClick={onLogout}>
					Log out
				</MenuItem>
			</Menu>
		</div>
	);
}
