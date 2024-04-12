import { useState, useCallback, useEffect } from 'react';

import { useMutation } from '@apollo/client';

import SettingsGroup from '../SettingGroup';
import Modal from '../Modal';
import Form from '../../organisms/Form';
import Alert, { Severity } from '../../atoms/Alert';
import InputField from '../InputField';

import useFormFields from '../../hooks/useFormFields';

import { graphql } from '../../types/graphql';
import { UpdateNameMutation } from '../../types/graphql/graphql';

const UpdateName_Query = graphql(`#graphql
	mutation updateName($name: String) {
		updateName(name: $name) {
			id
		}
	}
`);

export default function UpdateNameSettingGroup({ name }) {
	const [updateName, { data, loading }] = useMutation(UpdateName_Query, {
		onError: (error) => {
			if (error.message.startsWith('Name is required')) {
				setFieldMessageByName('name', 'This field is required', 'isError');
				return;
			}

			setMessage({
				severity: 'error',
				content: error.message
			});
		}
	});
	const [updatedName, setUpdatedName] = useState<UpdateNameMutation['updateName'] | null>(null);

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
	const [message, setMessage] = useState<{ severity: Severity, content: string } | null>(null);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		setDefaultFieldValueByName('name', name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	useEffect(() => {
		setTimeout(() => {
			setDefaultFieldValues();
			setMessage(null);
			setUpdatedName(null);
		}, 200);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalOpen]);

	useEffect(() => {
		if (data?.updateName) {
			setUpdatedName(data.updateName);
		}
	}, [data]);

	useEffect(() => {
		if (updatedName) {
			setMessage({
				severity: 'success',
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
				buttons={[
					{
						label: 'Close',
						onClick: closeModal,
						type: 'secondary'
					}
				]}
			>
				{message &&
					<Alert severity={message.severity}>{message.content}</Alert>}
				{!updatedName && <Form
					submitButtonText="Update"
					loading={loading}
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
