import React, { useState } from 'react';
import styles from './SkeletonChart.module.css';

import Skeleton from '../../atoms/Skeleton';

export default function SkeletonChart({
	columns = 16,
}: {
	columns?: number,
}) {
	const [randomColumnHights] = useState(Array.from({ length: columns }, () => Math.floor(Math.random() * 240) + 40));

	return (
		<span className={styles.container}>
			{randomColumnHights.map((height, index) => (
				<Skeleton key={index} width="35px" height={height} />
			))}
		</span>
	);
}