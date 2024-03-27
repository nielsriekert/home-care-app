import styles from './InputContainer.module.css';

export type State = 'loading' | 'validated' | 'error' | 'warning';

export default function InputContainer({
	children,
	state,
	className
} : {
	children: React.ReactNode,
	state?: State,
	className?: string,
}) {
	return (
		<div className={`${styles.container}${state ? ` ${styles[state]}` : ''}${className ? ` ${className}` : ''}`}>
			{children}
		</div>
	);
}
