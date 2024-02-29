import styles from './ToolTip.module.css';
import React, { Children, cloneElement, useRef, useState, useEffect, LegacyRef } from 'react';
import { createPortal } from 'react-dom';

import useWindowSize from '../../hooks/useWindowSize';

const calcPosition = (childRect: DOMRect, toolTipRect: DOMRect, windowSize: { width: number, height: number }): { x: number, y: number, offset: number } => {
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

export default function ToolTip({
	children,
	title,
	arrow = true
}: {
	children: React.ReactElement,
	title: string,
	arrow?: boolean,
}) {
	const windowSize = useWindowSize();
	const toolTipRef = useRef<HTMLSpanElement | null>(null);
	const childrenRef = useRef<Element[]>([]);
	const [transform, setTransform] = useState<string | null>(null);
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

	const onPointerEnter = () => onOver(true);
	const onPointerLeave = () => onOver(false);

	return (
		<>
			{Children.map(children, (child, index) =>
				cloneElement(child, {
					onPointerEnter,
					onPointerLeave,
					ref: (ref: Element) => (childrenRef.current[index] = ref)
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
