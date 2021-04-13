import React from 'react';

import Settings from '../../templates/Settings/Settings';

import Skeleton from '../../atoms/Skeleton/Skeleton';

import { useQuery, gql } from '@apollo/client';

const ABOUT = gql`
	query about {
		about {
			version
		}
	}
`;

export default function About() {
	const { loading, data } = useQuery(ABOUT);

	return (
		<Settings title="About">
			<p>
				App version: <strong>{process.env.REACT_APP_VERSION}</strong><br />
				Server version: {loading ? <Skeleton /> : data && data.about.version ? <strong>{data.about.version}</strong> : '-'}
			</p>
		</Settings>
	);
}