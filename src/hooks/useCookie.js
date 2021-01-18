import { useState } from 'react';

const getValue = (name) => {
	if (typeof document !== 'object') {
		return null;
	}

	const foundCookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
	return foundCookie ? foundCookie.split('=')[1] : null;
};

const setValue = (name, value, hoursToSave) => {
	if (typeof document !== 'object') {
		return null;
	}
	// TODO: this date cannot be trusted/relied on
	const dateInTheFuture = new Date();
	dateInTheFuture.setTime(new Date().getTime() + (hoursToSave * 60 * 60 * 1000));
	document.cookie = `${name}=${value};expires=${dateInTheFuture.toUTCString()};secure;samesite=strict`;
};

export default function useCookie(name, defaultValue) {
	const [cookie, setCookie] = useState(getValue(name || defaultValue));

	const updateCookie = (value, hoursToSave) => {
		setCookie(value);
		setValue(name, value, value !== null ? hoursToSave : 0);
	};

	return [cookie, updateCookie];
}