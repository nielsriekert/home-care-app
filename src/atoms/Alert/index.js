// @ts-check
import React from 'react';
import styles from './Alert.module.css';

import InfoIcon from '../InfoIcon';
import WarningIcon from '../WarningIcon';
import ErrorIcon from '../ErrorIcon';
import CheckCircleIcon from '../CheckCircleIcon';

const icons = {
	info: <InfoIcon />,
	error: <ErrorIcon />,
	warning: <WarningIcon />,
	success: <CheckCircleIcon />
};

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {'info' | 'warning' | 'error' | 'success'} [props.severity=info]
 * @returns {import('react').ReactElement}
 */
export default function Alert({ children, severity = 'info' }) {
	return (
		<div className={`${styles.container}${styles[severity] ? ` ${styles[severity]}` : ''}`}>
			<div className={styles.icon}>
				{icons[severity]}
			</div>
			<div>
				{children}
			</div>
		</div>
	);
}