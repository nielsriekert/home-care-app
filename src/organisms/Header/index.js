import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Header.module.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import UserAvatar from '../../atoms/UserAvatar';
import UserHeaderModal from '../../molecules/UserHeaderModal';

import MenuIcon from '../../atoms/MenuIcon';
import CogwheelIcon from '../../atoms/CogwheelIcon';

import { USER } from '../../fragments';

const ME = gql`
	${USER}
	query me {
		me {
			...UserFields
		}
	}
`;

export default function Header({ title, onOpen }) {
	const { data, loading } = useQuery(ME);
	const navContainer = useRef(null);
	const modalContainer = useRef(null);
	const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);

	const onClick = useCallback(e => {
		if (!modalContainer.current) {
			return;
		}

		if (!modalContainer.current.contains(e.target) && !navContainer.current.contains(e.target)) {
			setHeaderModalOpen(false);
		}
	},[modalContainer, navContainer]);

	const toggleHeaderModal = () => {
		setHeaderModalOpen(prevValue => !prevValue);
	};

	useEffect(() => {
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, [onClick]);

	return (
		<header className={styles.container}>
			<div className={`${styles.main}${typeof onOpen === 'function' ? ` ${styles.hasNavButton}` : ''}`}>
				{(title || typeof onOpen === 'function') && <div className={styles.titleContainer}>
					{typeof onOpen === 'function' && <button className={styles.navButton} onClick={onOpen}>
						<MenuIcon />
					</button>}
					{title && <Link to="/" className={styles.title}>{title}</Link>}
				</div>}
				<Link to="/settings" className={styles.settings}><CogwheelIcon /></Link>
				<div ref={navContainer} className={styles.nav}>
					<UserAvatar
						name={data ? data.me.name : ''}
						isLoading={loading}
						onClick={toggleHeaderModal}
						avatar={data ? data.me.avatar : ''}
					/>
				</div>
			</div>
			<div className={styles.modalWrapper + (isHeaderModalOpen ? ` ${styles.isOpen}` : '')}>
				<div ref={modalContainer} className={styles.modalContainer}>
					<UserHeaderModal
						isOpen={isHeaderModalOpen}
						email={data ? data.me.email : ''}
						name={data ? data.me.name : ''}
						avatar={data ? data.me.avatar : ''}
					/>
				</div>
			</div>
		</header>
	);
}
