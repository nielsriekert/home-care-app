import styles from './ProfileSettingGroups.module.css';

import { useQuery, gql } from '@apollo/client';

import { USER } from '../../fragments';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

import UpdateNameSettingGroup from '../../molecules/UpdateNameSettingGroup';

const ME_PROFILE = gql`
	${USER}
	query meProfile {
		me {
			...UserFields
		}
	}
`;

export default function ProfileSettingGroups() {
	const { data, loading, error } = useQuery(ME_PROFILE);

	if (error) {
		return <Alert severity="error" >{error.message}</Alert>;
	}

	return (
		<div className={styles.container}>
			{loading && <Skeleton width="100%" height="60px" />}
			{!loading && <UpdateNameSettingGroup name={data.me.name} />}
		</div>
	);
}
