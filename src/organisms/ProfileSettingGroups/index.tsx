import styles from './ProfileSettingGroups.module.css';

import { useQuery, gql } from '@apollo/client';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

import UpdateNameSettingGroup from '../../molecules/UpdateNameSettingGroup';

import { graphql } from '../../types/graphql';

const MeProfile_Query = graphql(`#graphql
	query meProfile {
		me {
			name
		}
	}
`);

export default function ProfileSettingGroups() {
	const { data, loading, error } = useQuery(MeProfile_Query);

	if (error) {
		return <Alert severity="error" >{error.message}</Alert>;
	}

	return (
		<div className={styles.container}>
			{loading && <Skeleton width="100%" height="60px" />}
			{data?.me && <UpdateNameSettingGroup name={data.me.name} />}
		</div>
	);
}
