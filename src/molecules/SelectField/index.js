import styles from './SelectField.module.css';

import FieldLabel from '../../atoms/FieldLabel';
import InputContainer from '../../atoms/InputContainer';
import FieldMessage from '../../atoms/FieldMessage';
import FieldDescription from '../../atoms/FieldDescription';

export default function SelectField({ label, name, value, description, choices = [], onChange, state, isRequired = true, message }) {
	function onValueChange(event) {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	}

	return (
		<div className={styles.container}>
			<FieldLabel label={label} isFloating fieldIsRequired={isRequired} />
			<InputContainer state={state}>
				<select name={name} onChange={onValueChange} value={value}>
					{choices.map(choice => (
						<option key={choice.value} value={choice.value}>{choice.label}</option>
					))}
				</select>
			</InputContainer>
			{message ?
				<FieldMessage styleType={message.type || ''}>
					{message.content}
				</FieldMessage> : ''}
			{description ?
				<FieldDescription>
					{description}
				</FieldDescription>
				: ''}
		</div>
	);
}