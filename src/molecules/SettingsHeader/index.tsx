import React from 'react';
import styles from './SettingsHeader.module.css';
import { useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '../../atoms/icons/ArrowLeftIcon';

export default function SettingsHeader({ title, backButton = true }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<header className={styles.container}>
			{backButton ?
				<button className={styles.backButton} onClick={goBack}><ArrowLeftIcon /></button> : ''}
			<h1>{title}</h1>
		</header>
	);
}