import styles from './FieldMessage.module.css';
import React, { ReactNode } from 'react';

export type StyleType = 'error' | 'validated';

export default function FieldMessage({
	children,
	styleType,
}: {
	children: ReactNode,
	styleType?: StyleType,
}) {
	return (
		<div className={`${styles.container}${styleType ? ` ${styles[styleType]}` : ''}`}>
			{children}
		</div>
	);
}
