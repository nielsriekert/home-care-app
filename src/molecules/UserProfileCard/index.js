import styles from './UserProfileCard.module.css';

import UserAvatar from '../../atoms/UserAvatar';

export default function UserProfileCard({ avatar, name, email }) {
	return (
		<div className={styles.container}>
			<div className={styles.photoContainer + (!avatar ? ` ${styles.isPlaceholder}` : '')}>
				<UserAvatar
					avatar={avatar}
					name={name}
				/>
			</div>
			<div className={styles.profileInfoContainer}>
				<span className={styles.name}>{name}</span>
				<span className={styles.email}>{email}</span>
			</div>
		</div>
	);
}
