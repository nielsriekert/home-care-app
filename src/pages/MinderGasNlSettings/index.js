import React, { useState, useEffect } from 'react';

import Settings from '../../templates/Settings';

import { useQuery, useMutation, gql } from '@apollo/client';

import InputFieldToggle from '../../molecules/InputFieldToggle';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

const IS_MINDER_GAS_SYNC_ACTIVE = gql`
	query isMinderGasNlSynchronizationActive {
		isMinderGasNlSynchronizationActive
	}
`;

const SET_STATE_MINDER_GAS_SYNC = gql`
	mutation setSyncStateSendingReadingsToMinderGasNl($sending: Boolean!) {
		setSyncStateSendingReadingsToMinderGasNl(sending: $sending)
	}
`;

const getSyncStateFromApi = (queryData, mutateData) => (
	typeof mutateData === 'undefined' ? (queryData && queryData.isMinderGasNlSynchronizationActive) === true : mutateData.setSyncStateSendingReadingsToMinderGasNl === true
);

export default function MinderGasNlSettings() {
	const [field, setField] = useState({
		label: 'Synchronization',
		name: 'minder-gas-nl-synchronization',
		checked: false,
	});
	const { loading, error, data } = useQuery(IS_MINDER_GAS_SYNC_ACTIVE);
	const [setSyncState, { data: sendingData }] = useMutation(SET_STATE_MINDER_GAS_SYNC);
	const [errorToDisplay, setErrorToDisplay] = useState(null);

	useEffect(() => {
		setErrorToDisplay(error);
	}, [error]);

	const handleInputChange = (name, value) => {
		setSyncState({
			variables: {
				sending: value,
			}
		});
	};

	useEffect(() => {
		setField(prevField => ({
			...prevField,
			isDisabled: false,
			checked: getSyncStateFromApi(data, sendingData),
		}));
	}, [data, sendingData]);

	return (
		<Settings title="MinderGas.nl synchronization">
			<p>
				Monitor your natural gas consumption, by connecting to mindergas.nl.<br />
				The backend server needs to be configured with the api key from mindergas.nl to activate this feature.
			</p>
			{errorToDisplay ?
				<Alert severity="error" >{errorToDisplay.message}</Alert> : ''}
			{!loading ?
				<InputFieldToggle
					{...field}
					onChange={handleInputChange}
				/>
				: <Skeleton />}
		</Settings>
	);
}
