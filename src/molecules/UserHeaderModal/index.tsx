import styles from './UserHeaderModal.module.css';

import { useMutation } from '@apollo/client';

import UserHeaderMenu from '../UserHeaderMenu';
import UserProfileCard from '../UserProfileCard';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql/gql';

const UserHeaderModalFragment = graphql(`
	fragment UserHeaderModalFragment on User {
		...UserProfileCardFragment
	}
`);

const Logout_Mutation = graphql(`
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
			]}
			/>
		</div>
	);
}
