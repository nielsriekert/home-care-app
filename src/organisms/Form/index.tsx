import styles from './Form.module.css';
import { useCallback, ReactNode } from 'react';
import { ApolloError } from '@apollo/client';

import Button from '../../atoms/Button';
import Alert from '../../atoms/Alert';

export default function Form({
	children,
	onSubmit,
	loading = false,
	isSubmitting = false,
	error,
	successMessage,
	submitButtonText
}: {
	children: ReactNode,
	onSubmit: React.FormEventHandler<HTMLFormElement>,
	loading?: boolean,
	isSubmitting?: boolean,
	error?: ApolloError | Error | null,
	successMessage?: string | ReactNode,
	submitButtonText?: string,
}) {
	const onFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
		event.preventDefault();
		if (typeof onSubmit === 'function') {
			onSubmit(event);
		}
	}, [onSubmit]);

	return (
		<div className={styles.wrapper + (loading ? ' ' + styles.isLoading : '')}>
			{!error && successMessage ?
				<Alert severity="success" >{successMessage}</Alert> :
				<form className={styles.form} method="post" noValidate onSubmit={onFormSubmit}>
					<div className={styles.body}>
						{children}
					</div>
					<div className={styles.footer}>
						{error ?
							<Alert severity="error" >{error.message}</Alert> : ''}
						<Button isSubmit isDisabled={loading || isSubmitting} pending={isSubmitting}>{submitButtonText || 'Send'}</Button>
					</div>
				</form>}
		</div>
	);
}