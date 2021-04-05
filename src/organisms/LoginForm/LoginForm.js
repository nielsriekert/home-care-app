import styles from './LoginForm.module.css';
import React, { useState, useCallback, useEffect } from 'react';
import {
	Redirect
} from 'react-router-dom';

import { useMutation, gql } from '@apollo/client';

import useCookie from '../../hooks/useCookie';

import InputField from '../../molecules/InputField/InputField';

import Message from '../../atoms/Message/Message';
import Button from '../../atoms/Button/Button';

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

function LoginForm() {
	const [accessToken, setCookie] = useCookie('authorization-token', null);
	const [fields, setFields] = useState([
		{
			type: 'email',
			label: 'E-mail',
			name: 'email',
			value: '',
			component: InputField
		},
		{
			type: 'password',
			label: 'Password',
			name: 'password',
			value: '',
			component: InputField
		}
	]);
	const [error, setError] = useState(null);

	const handleInputChange = useCallback((name, value) => {
		setFields(fields.map(field => ({
			...field,
			value: name === field.name ? value : field.value
		})));
	}, [fields]);

	const [login, { data, client } ] = useMutation(LOGIN);

	const onSubmit = (event) => {
		event.preventDefault();
		login({
			variables: {
				email: getFieldValueByName(fields, 'email'),
				password: getFieldValueByName(fields, 'password'),
			}
		}).catch(error => {
			if (error.message !== 'Invalid email and password combination') {
				throw error;
			}

			setError(error);
			setFields(fields.map(field => ({
				...field,
				error
			})));
		});
	};

	useEffect(() => {
		if (data && data.login.token) {
			setCookie(data.login.token, 720);
		}
	}, [data, client, setCookie]);

	if (accessToken) {
		return (
			<Redirect to="/" />
		);
	};

	return (
		<form noValidate onSubmit={onSubmit}>
			{fields.map(field => (
				<field.component
					{...field}
					key={field.name}
					onChange={handleInputChange}
				/>
			))}
			<div className={styles.footer}>
				{error ?
					<Message type="error" ><p>{error.message}</p></Message> : ''}
				<Button type="primary">Send</Button>
			</div>
		</form>
	);
}

export default LoginForm;