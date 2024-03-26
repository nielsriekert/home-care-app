import { useState, useEffect, useRef, useCallback, MouseEventHandler } from 'react';
import styles from './Header.module.css';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import UserAvatar from '../../atoms/UserAvatar';
import UserHeaderModal from '../../molecules/UserHeaderModal';

import MenuIcon from '../../atoms/icons/MenuIcon';
import CogwheelIcon from '../../atoms/icons/CogwheelIcon';

import ToolTip from '../../atoms/ToolTip';

import { graphql } from '../../types/graphql';

export const Me_Query = graphql(`#graphql
	query me {
		me {
			...UserHeaderModalFragment
			...UserAvatarFragment
		}
	}
`);

export default function Header({
	title,
	onOpen,
}: {
	title?: string,
	onOpen?: MouseEventHandler<HTMLButtonElement>
}) {
	const { data, loading } = useQuery(Me_Query);
	const navContainer = useRef<HTMLDivElement | null>(null);
	const modalContainer = useRef<HTMLDivElement | null>(null);
	const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);

	const onClick = useCallback(e => {
		if (!modalContainer.current) {
			return;
		}

		if (!modalContainer.current.contains(e.target) && !navContainer.current?.contains(e.target)) {
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
			<div className={styles.main}>
				{(title || typeof onOpen === 'function') && <div className={styles.titleContainer}>
					{typeof onOpen === 'function' && <button className={styles.navButton} onClick={onOpen}>
						<MenuIcon />
					</button>}
					{title && <Link to="/" className={styles.title}>{title}</Link>}
				</div>}
				<ToolTip title="Settings" arrow={false}>
					<Link to="/settings" className={styles.settings}><CogwheelIcon /></Link>
				</ToolTip>
				<div ref={navContainer} className={styles.nav}>
					{data?.me && <UserAvatar
						user={data.me}
						isLoading={loading}
						onClick={toggleHeaderModal}
					/>}
				</div>
			</div>
			<div className={styles.modalWrapper + (isHeaderModalOpen ? ` ${styles.isOpen}` : '')}>
				<div ref={modalContainer} className={styles.modalContainer}>
					{data?.me && <UserHeaderModal
						isOpen={isHeaderModalOpen}
						user={data.me}
					/>}
				</div>
			</div>
		</header>
	);
}
