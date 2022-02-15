import styles from './Modal.module.css';

import Button from '../../atoms/Button';
import { useCallback, useEffect, useRef } from 'react';

export default function Modal({ children, isOpen = false, onHide, title = '', buttons = [] }) {
	const wrapperRef = useRef(null);

	const onClick = useCallback(e => {
		if ((typeof onHide === 'function' && wrapperRef.current === e.target) || !wrapperRef.current.contains(e.target)) {
			onHide();
		}
	},[onHide, wrapperRef]);

	useEffect(() => {
		if (isOpen === true) {
			document.body.classList.add('is-modal-open');
		}
		else {
			document.body.classList.remove('is-modal-open');
		}
	}, [isOpen]);

	return (
		<div ref={wrapperRef} className={styles.wrapper + (isOpen ? ' ' + styles.isOpen : '')} onClick={onClick} aria-hidden={!isOpen} role="dialog" aria-modal="true">
			<div className={styles.container}>
				<header className={styles.headerContainer}>{title}</header>
				<div className={styles.bodyContainer}>
					{children}
				</div>
				{buttons.length > 0 ?
					<footer className={styles.footerContainer}>
						{buttons.map(button => (
							<Button key={button.label} {...button}>{button.label}</Button>
						))}
					</footer>
					: ''}
			</div>
		</div>
	);
}
