import styles from './InputContainer.module.css';

export default function InputContainer({ children, state }) {
	return (
		<div className={styles.container + (state ? ' ' + styles[state] : '')}>
			{children}
		</div>
	);
}
