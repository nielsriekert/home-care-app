import styles from './UserAvatar.module.css';
import React from 'react';

import Skeleton from '../Skeleton';

export default function UserAvatar({ name, avatar, onClick = undefined, isLoading }) {
	let WrapperElement = 'div';
	if (typeof onClick === 'function') {
		WrapperElement = 'button';
	}

	return (
		<WrapperElement onClick={onClick} className={styles.container + (!avatar && !isLoading ? ' ' + styles.noImage : '')}>
			{isLoading ?
				<Skeleton shape="circle" width="50px" height="50px" /> :
				avatar ? <img src={avatar} alt={name} /> : name}
		</WrapperElement>
	);
}
