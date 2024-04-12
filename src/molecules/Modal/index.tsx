import styles from './Modal.module.css';
import { ReactNode, MouseEventHandler } from 'react';

import Button, { ButtonProps } from '../../atoms/Button';
import { useCallback, useEffect, useRef } from 'react';

export interface ButtonPropsWithLabel extends Omit<ButtonProps, 'children'> {
	label: string,
}

export default function Modal({
	children,
	isOpen = false,
	onHide,
	title = '',
	buttons = []
}: {
	children: ReactNode,
	isOpen?: boolean,
	onHide?: () => void,
	title: string,
	buttons?: ButtonPropsWithLabel[]
}) {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const onClick: MouseEventHandler<HTMLDivElement> = useCallback(e => {
		if (typeof onHide === 'function' && (wrapperRef.current === e.target as HTMLDivElement || !wrapperRef.current?.contains(e.target as HTMLDivElement))) {
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
				{buttons.length > 0 &&
					<footer className={styles.footerContainer}>
						{buttons.map(button => (
							<Button key={button.label} {...button}>{button.label}</Button>
						))}
					</footer>}
			</div>
		</div>
	);
}
