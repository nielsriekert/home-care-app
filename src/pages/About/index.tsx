import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';

import { useQuery } from '@apollo/client';

import { graphql } from '../../types/graphql';

const About_Query = graphql(`
	query about {
		about {
			version
		}
	}
`);

export default function About() {
	const { loading, data } = useQuery(About_Query, {
		fetchPolicy: 'cache-and-network'
	});

	return (
		<Settings title="About">
			<p>
				App version: <strong>{process.env.REACT_APP_VERSION}</strong><br />
				Server version: {loading ? <Skeleton /> : data && data.about.version ? <strong>{data.about.version}</strong> : '-'}
			</p>
		</Settings>
	);
}