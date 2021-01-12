import './button.css';
import React from 'react';

function Button({ children, type, onClick }) {
	return (
		<button className={'button' + (type ? ' type-' + type : '')} onClick={onClick}>{children}</button>
	);
}

export default Button;