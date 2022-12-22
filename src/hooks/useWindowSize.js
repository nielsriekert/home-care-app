// @ts-check
// NOTE: modified version from https://usehooks.com/useWindowSize/
import { useEffect, useState, useRef } from 'react';

/**
 * @returns {{ width: number, height: number }}
 */
export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const resizeTimer = useRef(null);

	useEffect(() => {
		function handleResize() {
			clearTimeout(resizeTimer.current);

			resizeTimer.current = setTimeout(() => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight
				});
			}, 100);
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);


	return windowSize;
};
