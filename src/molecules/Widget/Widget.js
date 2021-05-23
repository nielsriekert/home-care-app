import styles from './Widget.module.css';
import React from 'react';

import LastUpdated from '../../atoms/LastUpdated/LastUpdated';

export default function Widget({ children, title, name, icon, updatedAt }) {
	return (
		<div className={styles.container + (name ? ' widget-' + name : '')}>
			{icon || title ?
				<div className={styles.header}>
					{icon ? <div className={styles.icon}>{icon}</div> : ''}
					{title ?
						<h3>{title}</h3> : ''}
				</div> : ''}
			<div className={styles.body}>
				{children}
				{updatedAt ?
					<div className={styles.dataTime}>
						<LastUpdated timestamp={updatedAt} />
					</div> : ''}
			</div>
		</div>
	);
}