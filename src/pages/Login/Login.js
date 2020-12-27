import './login.css';
import React from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';

function Login() {
	return (
		<div className="page-login-container">
			<div className="page-login-fill-container" />
			<div className="page-login-content-container">
				<h1>Hello, Welcome Back!</h1>
				<LoginForm />
			</div>
		</div>
	);
}

export default Login;