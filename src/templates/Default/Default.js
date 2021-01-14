import React from 'react';
import styles from './Default.module.css';

import Header from '../../organisms/Header/Header';

export default function Default({ children }) {
	return (
		<div className={styles.default}>
			<Header />
			<main className={styles.pageContainer}>
				{children}
			</main>
		</div>
	);
};