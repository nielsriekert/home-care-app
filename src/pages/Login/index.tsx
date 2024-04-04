import styles from  './Login.module.css';

import LoggedOut from '../../templates/LoggedOut';

import LoginForm from '../../organisms/LoginForm';

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
