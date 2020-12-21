import './input-field.css';
import React, { useState, useCallback } from 'react';

function InputFieldEmail({ type, label, name, value, onChange, error }) {
	const [isFocused, setFocus] = useState(false);

	function onValueChange(event) {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	}

	const handleFocusChange = useCallback(event => {
		setFocus(event.type === 'focus');
	}, [setFocus]);

	return (
		<div className={'input-field-container' + (isFocused ? ' is-focused' : '') + (error ? ' is-error' : '')}>
			<label>{label}</label>
			<input type={type} name={name} onFocus={handleFocusChange} onBlur={handleFocusChange} onChange={onValueChange} value={value} />
		</div>
	);
}

export default InputFieldEmail;