import React, { useState, useCallback, useEffect } from 'react';

import { useMutation, gql } from '@apollo/client';

import Form from '../Form';
import InputField from '../../molecules/InputField';

import { USER } from '../../fragments';

const LOGIN = gql`
	${USER}
	mutation login($email: String! $password: String!) {
		login(email: $email, password: $password) {
			user {
				...UserFields
			}
		}
	}
`;

const getFieldValueByName = (fields, name) => {
	const foundFields = fields.filter(field => field.name === name);
	return foundFields.length === 1 ? foundFields[0].value : null;
};

export default function LoginForm() {
	const [fields, setFields] = useState([
		{
			type: 'email',
			label: 'E-mail',
			name: 'email',
			isRequired: true,
			value: '',
			component: InputField
		},
		{
			type: 'password',
			label: 'Password',
			name: 'password',
			isRequired: true,
			value: '',
			component: InputField
		}
	]);

	const handleInputChange = useCallback((name, value) => {
		setFields(fields.map(field => ({
			...field,
			value: name === field.name ? value : field.value
		})));
	}, [fields]);

	const [login, { data, loading, error } ] = useMutation(LOGIN, { errorPolicy: 'all' });

	const onSubmit = (event) => {
		login({
			variables: {
				email: getFieldValueByName(fields, 'email'),
				password: getFieldValueByName(fields, 'password'),
			}
		});
	};

	useEffect(() => {
		if (data && data.login && data.login.user.id) {
			window.location = '/';
		}
	}, [data]);

	return (
		<Form
			error={error}
			onSubmit={onSubmit}
			isLoading={loading}
			isSubmitting={loading}
			submitButtonText="Login"
		>
			{fields.map(field => (
				<field.component
					{...field}
					key={field.name}
					onChange={handleInputChange}
				/>
			))}
		</Form>
	);
}
