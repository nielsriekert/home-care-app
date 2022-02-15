import { useState, useCallback, useEffect } from 'react';

import { useMutation, gql } from '@apollo/client';

import SettingsGroup from '../SettingGroup';
import Modal from '../Modal';
import Form from '../../organisms/Form';
import Message from '../../atoms/Message';
import InputField from '../InputField';

import useFormFields from '../../hooks/useFormFields';

import { USER } from '../../fragments';

const UPDATE_NAME = gql`
	${USER}
	mutation updateName($name: String) {
		updateName(name: $name) {
			...UserFields
		}
	}
`;

export default function UpdateNameSettingGroup({ name }) {
	const [updateName, { data, loading }] = useMutation(UPDATE_NAME, {
		onError: (error) => {
			if (error.message.startsWith('Name is required')) {
				setFieldMessageByName('name', 'This field is required', 'isError');
				return;
			}

			setMessage({
				type: 'error',
				content: error.message
			});
		}
	});
	const [updatedName, setUpdatedName] = useState(null);

	const [isModalOpen, setModalOpen] = useState(false);
	const [{
		getFieldValueByName,
		setFieldValueByName,
		setDefaultFieldValueByName,
		setDefaultFieldValues,
		setFieldMessageByName
	}, fields] = useFormFields([
		{
			type: 'text',
			label: 'Name',
			name: 'name',
			isRequired: true,
			value: name,
			component: InputField
		}
	]);
	const [message, setMessage] = useState(null);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		setDefaultFieldValueByName('name', name);
	}, [name]);

	useEffect(() => {
		setTimeout(() => {
			setDefaultFieldValues();
			setMessage(null);
			setUpdatedName(null);
		}, 200);
	}, [isModalOpen]);

	useEffect(() => {
		if (data?.updateName) {
			setUpdatedName(data.updateName);
		}
	}, [data]);

	useEffect(() => {
		if (updatedName) {
			setMessage({
				type: 'success',
				content: 'Your name has been changed'
			});
		}
	}, [updatedName]);

	const onSubmit = useCallback(() => {
		updateName({
			variables: {
				name: getFieldValueByName('name')
			}
		});
	}, [getFieldValueByName, updateName]);

	return (
		<div>
			<SettingsGroup name="Name" value={name} onUpdate={openModal} />
			<Modal
				title="Update name"
				isOpen={isModalOpen}
				onHide={closeModal}
				isBodyBackgroundColorGray
				buttons={[
					{
						label: 'Close',
						onClick: closeModal,
						type: 'secondary'
					}
				]}
			>
				{message &&
					<Message type={message.type}>{message.content}</Message>}
				{!updatedName && <Form
					submitButtonText="Update"
					isLoading={loading}
					isSubmitting={loading}
					onSubmit={onSubmit}
				>
					{fields.map(field => (
						<field.component
							{...field}
							key={field.name}
							value={getFieldValueByName(field.name)}
							onChange={setFieldValueByName}
						/>
					))}
				</Form>}
			</Modal>
		</div>
	);
}
