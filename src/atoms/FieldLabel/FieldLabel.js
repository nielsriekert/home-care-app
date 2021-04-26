import styles from './FieldLabel.module.css';

export default function FieldLabel({ label, isFloating, fieldIsRequired }) {
	return (
		<label className={styles.container + (isFloating ? ' ' + styles.isFloating : '')}>
			{label + (!fieldIsRequired ? ' (optional)' : '' )}
		</label>
	);
};
