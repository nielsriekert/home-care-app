import { useEffect, useState, useRef } from 'react';
import styles from './Default.module.css';

import Header from '../../organisms/Header';
import SideNav from '../../molecules/SideNav';

export default function Default({ title, children }) {
	const sideNav = useRef();
	const [isOpen, setIsOpen] = useState(false);

	const setOpen = (e) => {
		e.stopPropagation();
		setIsOpen(true);
	};

	const setClose = (e) => {
		if (sideNav?.current && sideNav.current.contains(e.target)) {
			return;
		}
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', setClose);
		return () => document.removeEventListener('click', setClose);
	}, []);

	return (
		<div className={styles.default}>
			<SideNav ref={sideNav} isOpen={isOpen} />
			<div className={styles.pageWrapper}>
				<Header title={title} isOpen={isOpen} onOpen={setOpen} />
				<main className={styles.pageContainer}>
					{children}
				</main>
			</div>
		</div>
	);
};