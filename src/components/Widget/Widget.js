import './widget.css';
import React from 'react';

function Widget({ children, title, name }) {
	return (
		<div className={'widget-container' + (name ? ' widget-' + name : '')}>
			{title ?
				<h3 className="widget-title">{title}</h3> : ''}
			{children}
		</div>
	);
}

export default Widget;