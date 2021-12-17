import React from 'react';

import styles from './InputFieldCheckbox.module.css';

import FieldLabel from '../../atoms/FieldLabel';

export default function InputFieldCheckbox({ label, name, choices = [], onChange, isRequired, error }) {
	function onValueChange(event) {
		if (typeof onChange === 'function') {
			onChange(name, event.target.value);
		}
	}

	return (
		<div className={styles.container}>
			{choices.length > 1 ?
				<FieldLabel label={label} fieldIsRequired={isRequired} isFloating /> : ''}
			<ul>
				{choices.map((choice, index) => (
					<li key={choice.value}>
						<input
							type="checkbox"
							name={name}
							value={choice.value}
							checked={choice.isChecked === true}
							id={name + '-' + index}
							onChange={onValueChange}
						/>
						<label htmlFor={name + '-' + index}>{choice.label}</label>
					</li>
				))}
			</ul>
			{error ?
				<div className={styles.errorMessage}>
					{error.message}
				</div> : ''}
		</div>
	);
}