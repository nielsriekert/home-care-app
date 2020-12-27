import './button.css';
import React from 'react';

function Button({ label, type }) {
	return (
		<button className={'button' + (type ? ' type-' + type : '')}>{label}</button>
	);
}

export default Button;