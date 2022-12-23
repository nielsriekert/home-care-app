// @ts-check
import styles from './ToolTip.module.css';
import React, { Children, cloneElement, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import useWindowSize from '../../hooks/useWindowSize';

/**
 * @param {DOMRect} childRect
 * @param {DOMRect} toolTipRect
 * @param {{ width: number, height: number }} windowSize
 * @returns {{ x: number, y: number, offset: number }}
*/
const calcPosition = (childRect, toolTipRect, windowSize) => {
	const offset = 15;
	const initialX = childRect.x + childRect.width / 2 - toolTipRect.width / 2;
	let x = Math.min(initialX, windowSize.width - toolTipRect.width - offset);
	x = Math.max(x, 0 + offset);

	return {
		x,
		y: childRect.y + + document.documentElement.scrollTop + childRect.height,
		offset: initialX - x
	};
};

/**
 * @param {object} props
 * @param {import('React').Children} props.children
 * @param {string} props.title
 * @param {boolean=} props.arrow
 * @returns
 */
export default function ToolTip({ children, title, arrow = true }) {
	const windowSize = useWindowSize();
	const toolTipRef = useRef(null);
	const childrenRef = useRef([]);
	const [transform, setTransform] = useState(null);
	const [over, onOver] = useState(false);
	const [arrowOffset, setArrowOffset] = useState(0);

	useEffect(() => {
		const [firstChild] = childrenRef?.current;

		if (!firstChild || !toolTipRef?.current) {
			return;
		}

		const childRect = firstChild.getBoundingClientRect();
		const toolTipRect = toolTipRef.current.getBoundingClientRect();

		const { x, y, offset } = calcPosition(childRect, toolTipRect, windowSize);
		setArrowOffset(offset);
		setTransform(`translate(${x}px, ${y}px)`);
	}, [childrenRef, toolTipRef, windowSize]);

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
					className={`${styles.container}${over ? ` ${styles.active}` : ''}${arrow ? ` ${styles.hasArrow}` : ''}`}
				>
					{arrow && <span className={styles.arrow} style={{ left: `calc(50% + ${arrowOffset}px)` }}></span>}
					{title}
				</span>,
				document.body
			)}
		</>
	);
}
