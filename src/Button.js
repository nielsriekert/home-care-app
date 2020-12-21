import React from 'react';
import './button.css';

function Button({ label, type }) {
	return (
		<button className={'button' + (type ? ' type-' + type : '')}>{label}</button>
	);
}

export default Button;