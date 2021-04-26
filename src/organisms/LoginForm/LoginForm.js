import React, { useState, useCallback, useEffect } from 'react';
import {
	Redirect
} from 'react-router-dom';

import { useMutation, gql } from '@apollo/client';

import useCookie from '../../hooks/useCookie';

import Form from '../../organisms/Form/Form';
import InputField from '../../molecules/InputField/InputField';

const LOGIN = gql`
	mutation login($email: String! $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				email
				name
			}
		}
	}
`;

const getFieldValueByName = (fields, name) => {
	const foundFields = fields.filter(field => field.name === name);
	return foundFields.length === 1 ? foundFields[0].value : null;
};

export default function LoginForm() {
	const [accessToken, setCookie] = useCookie('authorization-token', null);
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

	const [login, { data, loading, error, client } ] = useMutation(LOGIN, { errorPolicy: 'all' });

	const onSubmit = (event) => {
		login({
			variables: {
				email: getFieldValueByName(fields, 'email'),
				password: getFieldValueByName(fields, 'password'),
			}
		});
	};

	useEffect(() => {
		if (data && data.login && data.login.token) {
			setCookie(data.login.token, 720);
		}
	}, [data, client, setCookie]);

	if (accessToken) {
		return (
			<Redirect to="/" />
		);
	};

	return (
		<Form
			error={error}
			onSubmit={onSubmit}
			isLoading={loading}
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
