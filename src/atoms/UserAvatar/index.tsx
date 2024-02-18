import styles from './UserAvatar.module.css';

import Skeleton from '../Skeleton';
import ConditionalButton from '../ConditionalButton';

import { FragmentType, useFragment } from '../../types/graphql/fragment-masking';
import { graphql } from '../../types/graphql/gql';

const UserAvatarFragment = graphql(`
	fragment UserAvatarFragment on User {
		name
		avatar
	}
`);

export default function UserAvatar({
	user,
	onClick,
	isLoading = false,
}: {
	user: FragmentType<typeof UserAvatarFragment>,
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	isLoading?: boolean,
}) {
	const { name, avatar } = useFragment(UserAvatarFragment, user);

	return (
		<ConditionalButton onClick={onClick} className={styles.container + (!avatar && !isLoading ? ' ' + styles.noImage : '')}>
			{isLoading ?
				<Skeleton shape="circle" width="50px" height="50px" /> :
				avatar ? <img src={avatar} alt={name} /> : name}
		</ConditionalButton>
	);
}
