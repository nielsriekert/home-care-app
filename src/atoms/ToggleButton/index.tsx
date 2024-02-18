import styles from './ToggleButton.module.css';

export default function ToggleButton({
	children,
	checked = false,
	loading = false,
	disabled = false,
	onClick,
} : {
	children: React.ReactNode,
	checked?: boolean,
	loading?: boolean,
	disabled?: boolean,
	onClick?: React.MouseEventHandler<HTMLDivElement>,
}) {
	return (
		<div
			onClick={onClick}
			className={`${styles.container}${loading ? ` ${styles.loading}` : ''}${checked ? ` ${styles.checked}` : ''}${disabled ? ` ${styles.disabled}` : ''}`}
		>
			{children}
		</div>
	);
};