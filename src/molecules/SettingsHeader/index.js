import React from 'react';
import styles from './SettingsHeader.module.css';
import { useHistory } from 'react-router-dom';

import ArrowLeftIcon from '../../atoms/ArrowLeftIcon';

export default function SettingsHeader({ title, backButton = true }) {
	const history = useHistory();

	return (
		<header className={styles.container}>
			{backButton ?
				<button className={styles.backButton} onClick={history.goBack}><ArrowLeftIcon /></button> : ''}
			<h1>{title}</h1>
		</header>
	);
}