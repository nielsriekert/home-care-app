import styles from './SelectField.module.css';
import { ReactNode, ChangeEventHandler, useCallback } from 'react';

import FieldLabel from '../../atoms/FieldLabel';
import InputContainer, { State } from '../../atoms/InputContainer';
import FieldMessage, { StyleType } from '../../atoms/FieldMessage';
import FieldDescription from '../../atoms/FieldDescription';

interface Choice {
	label: string,
	value: string,
}

interface Message {
	type?: StyleType,
	content: ReactNode | string,
}

export default function SelectField({
	label,
	name,
	value,
	description,
	choices = [],
	onChange,
	state,
	isRequired = true,
	message,
}: {
	label: string,
	name: string,
	value: string,
	description?: ReactNode | string,
	choices: Choice[],
	onChange?: (name: string, value: string) => void,
	state?: State
	isRequired?: boolean,
	message?: Message
}) {
	const onValueHandler: ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	}, [name, onChange]);

	return (
		<div className={styles.container}>
			<FieldLabel label={label} isFloating fieldIsRequired={isRequired} />
			<InputContainer state={state}>
				<select name={name} onChange={onValueHandler} value={value}>
					{choices.map(choice => (
						<option key={choice.value} value={choice.value}>{choice.label}</option>
					))}
				</select>
			</InputContainer>
			{message ?
				<FieldMessage styleType={message.type}>
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