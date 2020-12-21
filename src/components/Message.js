import './message.css';
import React from 'react';

function Message({ type, children }) {
	return (
		<div className={'message-container' + (type ? ' message-type-' + type : ' message-type-notice')} >
			{children}
		</div>
	);
}

export default Message;