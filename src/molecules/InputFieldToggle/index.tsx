import styles from './InputFieldToggle.module.css';

import FieldLabel from '../../atoms/FieldLabel';
import FieldMessage from '../../atoms/FieldMessage';
import FieldDescription from '../../atoms/FieldDescription';
import ToggleButton from '../../atoms/ToggleButton';

export default function InputFieldToggle({
	label,
	name,
	value = '',
	checked = false,
	loading,
	description,
	onChange,
	isRequired = true,
	isDisabled,
	message
} : {
	label?: string,
	name: string,
	value?: string,
	checked?: boolean,
	loading?: boolean,
	description?: string,
	onChange?: (name: string, value: boolean) => void,
	isRequired?: boolean,
	isDisabled?: boolean,
	message?: {
		content: string,
		type?: 'isError' | 'isValidated',
	}
}) {
	function onValueChange() {
		if (typeof onChange === 'function') {
			onChange(name, !checked);
		}
	}

	return (
		<div className={styles.container}>
			{label && <FieldLabel label={label} fieldIsRequired={isRequired} isFloating />}
			<ToggleButton checked={checked} loading={loading} disabled={isDisabled}>
				<input
					type="checkbox"
					name={name}
					value={value}
					checked={checked}
					disabled={isDisabled}
					id={name}
					onChange={onValueChange}
				/>
			</ToggleButton>
			{message ?
				<div className={styles.fieldMessageContainer}>
					<FieldMessage styleType={message.type}>
						{message.content}
					</FieldMessage>
				</div> : ''}
			{description ?
				<FieldDescription>
					{description}
				</FieldDescription>
				: ''}
		</div>
	);
}