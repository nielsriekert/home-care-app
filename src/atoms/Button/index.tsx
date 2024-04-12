import styles from './Button.module.css';
import { ReactNode, MouseEventHandler } from 'react';

export interface ButtonProps {
	children: ReactNode,
	type?: 'primary' | 'secondary',
	isDisabled?: boolean,
	pending?: boolean,
	isSubmit?: boolean,
	onClick?: MouseEventHandler<HTMLButtonElement>,
}

export default function Button({
	children,
	type = 'primary',
	isDisabled = false,
	pending = false,
	isSubmit = false,
	onClick
}: ButtonProps) {
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
