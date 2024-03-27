import styles from './LoggedOut.module.css';

export default function LoggedOut({ children }) {
	return (
		<div className={styles.loggedOut}>
			<main className={styles.pageContainer}>
				{children}
			</main>
		</div>
	);
};
