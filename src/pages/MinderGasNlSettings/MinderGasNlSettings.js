import './minder-gas-nl-settings.css';
import React, { useState, useEffect } from 'react';

import Settings from '../../templates/Settings/Settings';

import { useQuery, useMutation, gql } from '@apollo/client';

import ProfileNavigation from '../../molecules/ProfileNavigation/ProfileNavigation';

import InputFieldCheckbox from '../../components/InputFieldCheckbox/InputFieldCheckbox';
import Message from '../../atoms/Message/Message';

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

const isSyncStateCheckboxChecked = field => field.fields.filter(checkField => checkField.checked).length >= 1;
const getSyncStateFromApi = (queryData, mutateData) => (
	typeof mutateData === 'undefined' ? (queryData && queryData.isMinderGasNlSynchronizationActive) === true : mutateData.setSyncStateSendingReadingsToMinderGasNl === true
);

export default function MinderGasNlSettings() {
	const [field, setField] = useState({
		type: 'checkbox',
		name: 'minder-gas-nl-synchronization',
		fields: [{
			label: 'Synchronization',
			value: 'active-mindergas-nl-synchronization',
			checked: false
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
				fields: prevField.fields.map(field => ({
					...field,
					checked: !field.checked,
					disabled: true
				}))
			};
		});
	};

	useEffect(() => {
		setField(prevField => ({
			...prevField,
			fields: prevField.fields.map(field => ({
				...field,
				checked: getSyncStateFromApi(data, sendingData),
				disabled: false
			}))
		}));
	}, [data, sendingData]);

	return (
		<Settings title="MinderGas.nl synchronization">
			{errorToDisplay ?
				<Message type="error" ><p>{errorToDisplay.message}</p></Message> : ''}
			{!loading ?
				<InputFieldCheckbox
					{...field}
					key={field.name}
					onChange={handleInputChange}
				/> : ''}
		</Settings>
	);
}
