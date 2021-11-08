import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Header.module.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import UserAvatar from '../../atoms/UserAvatar';
import UserHeaderModal from '../../molecules/UserHeaderModal';

import CogwheelIcon from '../../atoms/CogwheelIcon/CogwheelIcon';

import { USER } from '../../fragments';

const ME = gql`
	${USER}
	query me {
		me {
			...UserFields
		}
	}
`;

export default function Header() {
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
	}, []);

	return (
		<header className={styles.container}>
			<div className={styles.main}>
				<div>
					<Link to="/" className={styles.appName}>Home Care</Link>
				</div>
				<Link to="/settings"><CogwheelIcon /></Link>
				<div ref={navContainer} className={styles.nav}>
					<UserAvatar
						name={data ? data.me.name : ''}
						isLoading={loading}
						onClick={toggleHeaderModal}
						avatar={data ? data.me.avatar : ''}
					/>
				</div>
			</div>
			{/* <div className="header-navigation-container">
				<Navigation />
			</div> */}

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
