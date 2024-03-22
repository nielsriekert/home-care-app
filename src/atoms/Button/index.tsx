import styles from './Button.module.css';
import React, { ReactNode, MouseEventHandler } from 'react';

export default function Button({
	children,
	type = 'primary',
	isDisabled = false,
	pending = false,
	isSubmit = false,
	onClick
}: {
	children: ReactNode,
	type?: 'primary' | 'secondary',
	isDisabled?: boolean,
	pending?: boolean,
	isSubmit?: boolean,
	onClick?: MouseEventHandler<HTMLButtonElement>,
}) {
	return (
		<button
			type={!isSubmit ? 'button' : 'submit'}
			disabled={isDisabled}
			className={styles.button + (type ? ' ' + styles[type] : '') + (pending ? ' ' + styles.pending : '')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
