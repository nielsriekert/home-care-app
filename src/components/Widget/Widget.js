import styles from './Widget.module.css';
import React from 'react';

export default function Widget({ children, title, name, icon }) {
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
			</div>
		</div>
	);
}