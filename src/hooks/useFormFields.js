import { useState } from 'react';

const getFieldValuesFromFields = (fields) => fields.map(field => ({
	name: field.name,
	value: field.value
}));

const removeAtIndex = (arr, index) => {
	const copy = [...arr];
	copy.splice(index, 1);
	return copy;
};

const toggle = (arr, item, getValue = item => item) => {
	const index = arr.findIndex(i => getValue(i) === getValue(item));
	if (index === -1) return [...arr, item];
	return removeAtIndex(arr, index);
};


export default function useFormFields(initialFieldsState) {
	const [fields, setFields] = useState(initialFieldsState);
	const [values, setFieldValues] = useState(getFieldValuesFromFields(initialFieldsState));

	const getFieldValueByName = (name) => {
		const foundFields = values.filter(field => field.name === name);
		return foundFields.length === 1 ? foundFields[0].value : null;
	};

	const getDefaultFieldValueByName = (name) => {
		const foundFields = fields.filter(field => field.name === name);
		return foundFields.length === 1 ? foundFields[0].value : null;
	};

	const setFieldValueByName = (name, value) => setFieldValues(prevFields => prevFields.map(field => ({
		...field,
		value: name === field.name ? Array.isArray(field.value) ? toggle(field.value, value) : value : field.value
	})));

	const setDefaultFieldValueByName = (name, value) => setFields(prevFields => prevFields.map(field => ({
		...field,
		value: name === field.name ? Array.isArray(field.value) ? toggle(field.value, value) : value : field.value
	})));

	const clearFieldValues = () => setFieldValues(prevFields => prevFields.map(field => ({
		...field,
		value: ''
	})));

	const setDefaultFieldValues = () => {
		setFieldValues(prevFields => prevFields.map(field => ({
			...field,
			value: getDefaultFieldValueByName(field.name)
		})));
		setFields(prevFields => prevFields.map(field => ({
			...field,
			state: undefined,
			message: undefined
		})));
	};

	const setFieldMessageByName = (name, message, type = '') => setFields(prevFields => prevFields.map(field => ({
		...field,
		message: name === field.name ? message ? { content: message, type } : undefined : field.message,
		state: name === field.name && message && type ? type : field.state
	})));

	const setFieldStateByName = (name, state = undefined) => setFields(prevFields => prevFields.map(field => ({
		...field,
		state: name === field.name ? state : field.state,
		message: name === field.name && field.message && field.message.type === 'isError' && state === 'isValidated' ? undefined : field.message
	})));

	const setFieldDisabledByName = (name, isDisabled) => setFields(prevFields => prevFields.map(field => ({
		...field,
		isDisabled: name === field.name ? isDisabled : field.isDisabled
	})));

	const setFieldChoicesByName = (name, choices, merge) => setFields(prevFields => prevFields.map(field => ({
		...field,
		choices: name === field.name ? typeof merge === 'function' ? merge(choices, field.choices) : choices : field.choices
	})));

	const isFieldRequiredByName = (name) => {
		const foundFields = fields.filter(field => field.name === name);
		return foundFields.length === 1 ? foundFields[0].isRequired !== false : null;
	};

	const isFieldValueValidByName = (name, value) => {
		const foundFields = fields.filter(field => field.name === name);
		if (typeof value !== 'string') {
			value = getFieldValueByName(name);
		}
		return foundFields.length === 1 ? typeof foundFields[0].isValueValid === 'function' ? foundFields[0].isValueValid(value) : value.length > 0 : null;
	};

	const areAllFieldsValid = () => values.filter(field => !isFieldRequiredByName(field.name) || isFieldValueValidByName(field.name, field.value)).length === values.length;

	return [{
		getFieldValueByName,
		setFieldValueByName,
		setDefaultFieldValueByName,
		clearFieldValues,
		setDefaultFieldValues,
		setFieldChoicesByName,
		setFieldMessageByName,
		setFieldStateByName,
		setFieldDisabledByName,
		areAllFieldsValid
	}, fields, values];
}