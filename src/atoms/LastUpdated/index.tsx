import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import useInterval from '../../hooks/useInterval';

export default function LastUpdated({
	timestamp,
}: {
	timestamp: number,
}) {
	const [elapsedTime, setElapsedTime] = useState<string | null>(null);

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
