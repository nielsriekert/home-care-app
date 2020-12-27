import './login-form.css';
import React, { useState, useCallback } from 'react';
import {
	Redirect
} from 'react-router-dom';

import { useMutation, gql, makeVar } from '@apollo/client';

import Cookies from 'cookies.js';

import InputField from '../components/InputField';
import Message from '../components/Message';
import Button from '../components/Button/Button';

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
	const userVar = makeVar(null);
	const [fields, setFields] = useState([
		{
			type: 'email',
			label: 'E-mail',
			name: 'email',
			value: ''
		},
		{
			type: 'password',
			label: 'Password',
			name: 'password',
			value: ''
		}
	]);
	const [error, setError] = useState(null);

	const handleInputChange = useCallback((name, value) => {
		setFields(fields.map(field => ({
			...field,
			value: name === field.name ? value : field.value
		})));
	}, [fields]);

	const [login, { data }] = useMutation(LOGIN);

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

	if (data && data.login.token) {
		userVar(data.login.user);
		Cookies.set('authorization-token', data.login.token, { expires: 365 });
		return (
			<Redirect to="/" />
		);
	}

	return (
		<form noValidate onSubmit={onSubmit}>
			{fields.map(field => (
				<InputField
					{...field}
					key={field.name}
					onChange={handleInputChange}
				/>
			))}
			<div className="form-footer-container">
				{error ?
					<Message type="error" ><p>{error.message}</p></Message> : ''}
				<Button label="Send" type="primary" />
			</div>
		</form>
	);
}

export default LoginForm;