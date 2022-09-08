import React from 'react';
import styles from './Message.module.css';

/**
 * @param {type=} props
 * @returns
 */
export default function Message({ type = 'notice', children }) {
	return (
		<div className={`${styles.container}${styles[type] && ` ${styles[type]}`}`} >
			{typeof children === 'string' ?
				<p>{children}</p> : children}
		</div>
	);
}
