import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ children, diameter = '20px', borderWidth = '4px', isHidden }) {
	return (
		<div className={`${styles.container}${isHidden ? ` ${styles.isHidden}` : ''}`} style={{ width: diameter, height: diameter, borderWidth }}>
			{children}
		</div>
	);
}