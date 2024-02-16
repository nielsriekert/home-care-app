import styles from './FieldLabel.module.css';

export default function FieldLabel({
	label,
	isFloating = false,
	fieldIsRequired = false,
}: {
	label: string,
	isFloating? : boolean,
	fieldIsRequired?: boolean,
}) {
	return (
		<label className={styles.container + (isFloating ? ' ' + styles.isFloating : '')}>
			{label + (!fieldIsRequired ? ' (optional)' : '' )}
		</label>
	);
};
