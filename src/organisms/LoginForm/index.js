import React, { useCallback, useEffect } from 'react';

import { useMutation, gql } from '@apollo/client';

import Form from '../Form';
import InputField from '../../molecules/InputField';

import useFormFields from '../../hooks/useFormFields';

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

export default function LoginForm() {
	const [{
		getFieldValueByName,
		setFieldValueByName
	}, fields] = useFormFields([
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

	const [login, { data, loading, error } ] = useMutation(LOGIN, { errorPolicy: 'all' });

	const onSubmit = useCallback(() => {
		login({
			variables: {
				email: getFieldValueByName('email'),
				password: getFieldValueByName('password'),
			}
		});
	}, [getFieldValueByName, login]);

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
					value={getFieldValueByName(field.name)}
					onChange={setFieldValueByName}
				/>
			))}
		</Form>
	);
}
