import styles from './Menu.module.css';

export default function Menu({
	children,
	className,
}: {
	children: React.ReactNode,
	className?: string
}) {
	return (
		<nav className={`${styles.container}${className ? ` ${className}` : ''}`}>
			{children}
		</nav>
	);
}