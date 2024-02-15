// NOTE: from https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
import { useEffect, useRef, useState } from 'react';

export default function useIntersect({
	root,
	rootMargin,
	threshold = 0,
}: {
	root?: Document | Element,
	rootMargin?: string,
	threshold?: number[] | number,
}) : [React.Dispatch<React.SetStateAction<HTMLElement | null>>, IntersectionObserverEntry | null, HTMLElement | null] {
	const [entry, updateEntry] = useState<IntersectionObserverEntry | null>(null);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef(
		new window.IntersectionObserver(([entry]) => updateEntry(entry), {
			root,
			rootMargin,
			threshold
		})
	);

	useEffect(() => {
		const { current: currentObserver } = observer;
		currentObserver.disconnect();

		if (node) currentObserver.observe(node);

		return () => currentObserver.disconnect();
	}, [node]);

	return [setNode, entry, node];
};
