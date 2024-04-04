import styles from './InputField.module.css';
import React, { useState, useCallback, ReactNode } from 'react';

import FieldLabel from '../../atoms/FieldLabel';
import InputContainer, { State } from '../../atoms/InputContainer';
import FieldDescription from '../../atoms/FieldDescription';
import FieldMessage, { StyleType } from '../../atoms/FieldMessage';

export default function InputField({
	type = 'text',
	label,
	name,
	value,
	description,
	onChange,
	isRequired = true,
	onFocus,
	state,
	disabled = false,
	message,
	containerClass
}: {
	type?: React.HTMLInputTypeAttribute,
	label: string,
	name: string,
	value?: string,
	description?: ReactNode | string,
	onChange?: (name: string, value: string) => void,
	isRequired?: boolean,
	onFocus?: (name: string, event: React.FocusEvent<HTMLInputElement, Element>) => void,
	state?: State
	disabled?: boolean,
	message?: {
		content: string,
		type?: StyleType,
	},
	containerClass?: string,
}) {
	const [isFocused, setFocus] = useState(false);

	const onValueChange = (event) => {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	};

	const handleFocusChange: React.FocusEventHandler<HTMLInputElement> = useCallback(event => {
		setFocus(event.type === 'focus');
		if (typeof onFocus === 'function') {
			onFocus(name, event);
		}
	}, [setFocus, name, onFocus]);

	return (
		<div className={styles.container + (disabled ? ' ' + styles.isDisabled : '') + (containerClass ? ' ' + containerClass : '')}>
			<FieldLabel label={label} fieldIsRequired={isRequired} isFloating={isFocused || (typeof value === 'string' && value.length > 0)} />
			<InputContainer state={state}>
				<input
					type={type}
					name={name}
					onFocus={handleFocusChange}
					onBlur={handleFocusChange}
					onChange={onValueChange}
					value={value}
					disabled={disabled}
				/>
			</InputContainer>
			{message &&
				<FieldMessage styleType={message.type}>
					{message.content}
				</FieldMessage>}
			{description &&
				<FieldDescription>
					{description}
				</FieldDescription>}
		</div>
	);
}
