// @ts-check
import styles from './ToolTip.module.css';
import React, { Children, cloneElement, useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function ToolTip({ children, title }) {
	const toolTipRef = useRef(null);
	const childrenRef = useRef([]);
	const [transform, setTransform] = useState(null);
	const [over, onOver] = useState(false);

	useEffect(() => {
		const [firstChild] = childrenRef?.current;

		if (!firstChild || !toolTipRef?.current) {
			return;
		}

		const childRect = firstChild.getBoundingClientRect();
		const toolTipRect = toolTipRef.current.getBoundingClientRect();

		setTransform(`translate(${childRect.x + childRect.width / 2 - toolTipRect.width / 2}px, ${childRect.y + childRect.height}px)`);
	}, [childrenRef, toolTipRef]);

	const onMouseEnter = () => onOver(true);
	const onMouseLeave = () => onOver(false);

	return (
		<>
			{Children.map(children, (child, index) =>
				cloneElement(child, {
					onMouseEnter,
					onMouseLeave,
					ref: (ref) => (childrenRef.current[index] = ref)
				})
			)}
			{createPortal(
				<span
					ref={toolTipRef}
					role="tooltip"
					style={transform ? { transform }: undefined}
					className={`${styles.container}${over ? ` ${styles.active}` : ''}`}
				>
					{title}
				</span>,
				document.body
			)}
		</>
	);
}
