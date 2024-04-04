import { useEffect, useState } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';

import Settings from '../../templates/Settings';

import InputFieldToggle from '../../molecules/InputFieldToggle';

import { graphql } from '../../types/graphql/gql';

const IsMinderGasSyncActive_Query = graphql(`#graphql
	query isMinderGasNlSynchronizationActive {
		settings {
			id
			minderGasNlSynchronizationActive
		}
	}
`);

const SetMinderGasSync_Mutation = graphql(`#graphql
	mutation setSyncStateSendingReadingsToMinderGasNl($settings: SettingsInput!) {
		setSettings(settings: $settings) {
			id
			minderGasNlSynchronizationActive
		}
	}
`);

export default function MinderGasNlSettings() {
	const { data, loading, error: errorGet } = useQuery(IsMinderGasSyncActive_Query, {
		fetchPolicy: 'cache-and-network'
	});
	const [setSyncState, { loading: loadingSet, error: errorSet }] = useMutation(SetMinderGasSync_Mutation);
	const [error, setError] = useState<ApolloError | undefined>(undefined);

	const handleInputChange = (name: string, value: boolean) => {
		setSyncState({
			variables: {
				settings: {
					minderGasNlSynchronizationActive: value
				}
			}
		});
	};

	useEffect(() => {
		setError(errorSet || errorGet);
	}, [errorGet, errorSet]);

	return (
		<Settings title="MinderGas.nl synchronization">
			<p>
				Monitor your natural gas consumption, by connecting to mindergas.nl.<br />
				The backend server needs to be configured with the api key from mindergas.nl to activate this feature.
			</p>
			<InputFieldToggle
				label="Synchronization"
				name="minder-gas-nl-synchronization"
				message={error ? {
					type: 'error',
					content: error?.message
				} : undefined}
				isDisabled={!data}
				loading={loading || loadingSet}
				checked={data?.settings.minderGasNlSynchronizationActive ?? false}
				onChange={handleInputChange}
			/>
		</Settings>
	);
}
