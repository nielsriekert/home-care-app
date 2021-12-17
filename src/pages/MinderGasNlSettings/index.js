import React, { useState, useEffect } from 'react';

import Settings from '../../templates/Settings';

import { useQuery, useMutation, gql } from '@apollo/client';

import InputFieldCheckbox from '../../molecules/InputFieldCheckbox';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';

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

const isSyncStateCheckboxChecked = field => field.choices.filter(checkField => checkField.isChecked).length >= 1;
const getSyncStateFromApi = (queryData, mutateData) => (
	typeof mutateData === 'undefined' ? (queryData && queryData.isMinderGasNlSynchronizationActive) === true : mutateData.setSyncStateSendingReadingsToMinderGasNl === true
);

export default function MinderGasNlSettings() {
	const [field, setField] = useState({
		label: 'Synchronization',
		name: 'minder-gas-nl-synchronization',
		choices: [{
			label: 'Synchronization',
			value: 'active-mindergas-nl-synchronization',
		}]
	});
	const { loading, error, data } = useQuery(IS_MINDER_GAS_SYNC_ACTIVE);
	const [setSyncState, { data: sendingData }] = useMutation(SET_STATE_MINDER_GAS_SYNC);
	const [errorToDisplay, setErrorToDisplay] = useState(null);

	useEffect(() => {
		setErrorToDisplay(error);
	}, [error]);

	const handleInputChange = (name, value) => {
		setField(prevField => {
			setSyncState({
				variables: {
					sending: !isSyncStateCheckboxChecked(prevField),
				}
			}).catch(error => {
				setErrorToDisplay(error);
			});

			return {
				...prevField,
				isDisabled: true,
				choices: prevField.choices.map(field => ({
					...field,
					isChecked: !field.isChecked,
				}))
			};
		});
	};

	useEffect(() => {
		setField(prevField => ({
			...prevField,
			isDisabled: false,
			choices: prevField.choices.map(field => ({
				...field,
				isChecked: getSyncStateFromApi(data, sendingData),
			}))
		}));
	}, [data, sendingData]);

	return (
		<Settings title="MinderGas.nl synchronization">
			<p>
				Monitor your natural gas consumption, by connecting to mindergas.nl.<br />
				The backend server needs to be configured with the api key from mindergas.nl to activate this feature.
			</p>
			{errorToDisplay ?
				<Message type="error" >{errorToDisplay.message}</Message> : ''}
			{!loading ?
				<InputFieldCheckbox
					{...field}
					onChange={handleInputChange}
				/>
				: <Skeleton />}
		</Settings>
	);
}
