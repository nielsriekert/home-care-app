import styles from './Form.module.css';
import React, { useCallback } from 'react';

import Button from '../../atoms/Button/Button';
import Message from '../../atoms/Message/Message';

export default function Form({ children, onSubmit, isLoading, error, successMessage, submitButtonText }) {
	const onFormSubmit = useCallback((event) => {
		event.preventDefault();
		if (typeof onSubmit === 'function') {
			onSubmit(event);
		}
	}, [onSubmit]);

	return (
		<div className={styles.wrapper + (isLoading ? ' ' + styles.isLoading : '')}>
			{!error && successMessage ?
				<Message type="success" >{successMessage}</Message> :
				<form className={styles.form} method="post" noValidate onSubmit={onFormSubmit}>
					<div className={styles.body}>
						{children}
					</div>
					<div className={styles.footer}>
						{error ?
							<Message type="error" >{error.message}</Message> : ''}
						<Button isSubmit isDisabled={isLoading} pending={isLoading}>{submitButtonText || 'Send'}</Button>
					</div>
				</form>}
		</div>
	);
}