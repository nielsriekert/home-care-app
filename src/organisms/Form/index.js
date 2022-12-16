import styles from './Form.module.css';
import React, { useCallback } from 'react';

import Button from '../../atoms/Button';
import Alert from '../../atoms/Alert';

export default function Form({ children, onSubmit, isLoading = false, isSubmitting = false, error, successMessage, submitButtonText }) {
	const onFormSubmit = useCallback((event) => {
		event.preventDefault();
		if (typeof onSubmit === 'function') {
			onSubmit(event);
		}
	}, [onSubmit]);

	return (
		<div className={styles.wrapper + (isLoading ? ' ' + styles.isLoading : '')}>
			{!error && successMessage ?
				<Alert severity="success" >{successMessage}</Alert> :
				<form className={styles.form} method="post" noValidate onSubmit={onFormSubmit}>
					<div className={styles.body}>
						{children}
					</div>
					<div className={styles.footer}>
						{error ?
							<Alert severity="error" >{error.message}</Alert> : ''}
						<Button isSubmit isDisabled={isLoading || isSubmitting} pending={isSubmitting}>{submitButtonText || 'Send'}</Button>
					</div>
				</form>}
		</div>
	);
}