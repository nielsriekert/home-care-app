import styles from  './Login.module.css';
import React from 'react';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

import LoginForm from '../../organisms/LoginForm/LoginForm';

export default function Login() {
	return (
		<LoggedOut>
			<div className={styles.container}>
				<div className={styles.fillContainer} />
				<div className={styles.contentContainer}>
					<h1>Hello, Welcome Back!</h1>
					<LoginForm />
				</div>
			</div>
		</LoggedOut>
	);
}
