import styles from './InputField.module.css';
import React, { useState, useCallback } from 'react';

import FieldDescription from '../../atoms/FieldDescription/FieldDescription';
import FieldMessage from '../../atoms/FieldMessage/FieldMessage';

export default function InputField({ type, label, name, value, description, onChange, onFocus, state, isDisabled = false, message, containerClass }) {
	const [isFocused, setFocus] = useState(false);

	const onValueChange = useCallback((event) => {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	}, [name, onChange]);

	const handleFocusChange = useCallback(event => {
		setFocus(event.type === 'focus');
		if (typeof onFocus === 'function') {
			onFocus(name, event);
		}
	}, [setFocus, name, onFocus]);

	return (
		<div className={styles.container + (isDisabled ? ' ' + styles.isDisabled : '') + (containerClass ? ' ' + containerClass : '')}>
			<label className={isFocused || value ? styles.isFloating : undefined}>{label}</label>
			<div className={styles.inputContainer + (state ? ' ' + styles[state] : '')}>
				<input
					type={type}
					name={name}
					onFocus={handleFocusChange}
					onBlur={handleFocusChange}
					onChange={onValueChange}
					value={value}
					disabled={isDisabled}
				/>
			</div>
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
