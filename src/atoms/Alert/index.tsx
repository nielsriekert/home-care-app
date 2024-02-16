import styles from './Alert.module.css';
import React from 'react';

import InfoIcon from '../icons/InfoIcon';
import WarningIcon from '../icons/WarningIcon';
import ErrorIcon from '../icons/ErrorIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

const icons = {
	info: <InfoIcon />,
	error: <ErrorIcon />,
	warning: <WarningIcon />,
	success: <CheckCircleIcon />
};

export type Severity = 'info' | 'warning' | 'error' | 'success';

export default function Alert({
	children,
	severity = 'info',
}: {
	children: React.ReactNode,
	severity?: Severity,
}) {
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