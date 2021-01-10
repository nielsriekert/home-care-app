import './input-field-checkbox.css';
import React, { useState, useCallback } from 'react';

function InputFieldCheckbox({ name, fields, onChange, error }) {
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
		<div className={'input-field-container input-field-checkbox' + (isFocused ? ' is-focused' : '') + (error ? ' is-error' : '')}>
			{fields.length > 0 ?
				fields.length === 1 ?
					<div>
						<label>{fields[0].label}</label>
						<input
							type="checkbox"
							name={name}
							onFocus={handleFocusChange}
							onBlur={handleFocusChange}
							onChange={onValueChange}
							value={fields[0].value}
							checked={fields[0].checked}
							disabled={fields[0].disabled}
						/>
					</div> :
					<ul>
						{fields.map(field => (
							<li>
								<label>{field.label}</label>
								<input
									type="checkbox"
									name={name}
									onFocus={handleFocusChange}
									onBlur={handleFocusChange}
									onChange={onValueChange}
									value={field.value}
									checked={field.checked}
									disabled={fields[0].disabled}
								/>
							</li>
						))}
					</ul> : ''
			}
		</div>
	);
}

export default InputFieldCheckbox;