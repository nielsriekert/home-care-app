import styles from './UserProfileCard.module.css';

import UserAvatar from '../../atoms/UserAvatar';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql';

const UserProfileCardFragment = graphql(`#graphql
	fragment UserProfileCardFragment on User {
		...UserAvatarFragment
		avatar
		name
		email
	}
`);

export default function UserProfileCard({
	user,
}: {
	user: FragmentType<typeof UserProfileCardFragment>,
}) {
	const userFragment = useFragment(UserProfileCardFragment, user);

	return (
		<div className={styles.container}>
			<div className={styles.photoContainer + (!userFragment.avatar ? ` ${styles.isPlaceholder}` : '')}>
				<UserAvatar
					user={userFragment}
				/>
			</div>
			<div className={styles.profileInfoContainer}>
				<span className={styles.name}>{userFragment.name}</span>
				<span className={styles.email}>{userFragment.email}</span>
			</div>
		</div>
	);
}
