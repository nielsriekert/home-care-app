import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import useInterval from '../../hooks/useInterval';

export default function LastUpdated({ timestamp }) {
	const [elapsedTime, setElapsedTime] = useState(null);

	useInterval(() => {
		setElapsedTime(DateTime.fromSeconds(timestamp).toRelative());
	}, 1000);

	useEffect(() => {
		setElapsedTime(DateTime.fromSeconds(timestamp).toRelative());
	}, [timestamp]);

	return (
		<span>
			{elapsedTime}
		</span>
	);
}
