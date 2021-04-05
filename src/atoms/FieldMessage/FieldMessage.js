import styles from './FieldMessage.module.css';
import React from 'react';

export default function FieldMessage({ children, styleType }) {
	return (
		<div className={styles.container + (styles[styleType] ? ' ' + styles[styleType] : '')}>
			{children}
		</div>
	);
}
