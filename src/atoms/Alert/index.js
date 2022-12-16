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
 * @param {'info' | 'warning' | 'error' | 'success'} props.severity
 * @returns
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