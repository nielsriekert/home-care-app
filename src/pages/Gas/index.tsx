// @ts-check
import React from 'react';

import { DateTime, Duration } from 'luxon';

import Default from '../../templates/Default/index.js';

import WidgetGrid from '../../organisms/WidgetGrid/index.js';

import Widget from '../../molecules/Widget/index.js';

import FireIcon from '../../atoms/FireIcon/index.js';

import GasUsage from '../../molecules/GasUsage/index.js';
import GasChart from '../../molecules/GasChart';

import { TimeSpan } from '../../types/graphql/graphql.ts';

export default function Dashboard() {
	return (
		<Default title="Gas">
			<WidgetGrid>
				<Widget title="Today" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Last 4 days" name="gas-usage-chart" icon={<FireIcon />}>
					<GasChart
						resolution={TimeSpan.TwoHours}
						duration={Duration.fromDurationLike({ days: 4 })}
						end={DateTime.now()}
						chartType="column"
					/>
				</Widget>
				<Widget title="Week" name="gas-usage-current-week" icon={<FireIcon />}>
					<GasChart
						title="Week"
						resolution={TimeSpan.Day}
						duration={Duration.fromDurationLike({ week: 1 })}
						end={DateTime.now().endOf('week')}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={1}
					/>
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasChart
						resolution={TimeSpan.Month}
						duration={Duration.fromDurationLike({ year: 1 })}
						end={DateTime.now().endOf('month')}
						chartType="column"
						timeFormat={{ month: 'long' }}
						includePrevious
						softMax={20}
					/>
				</Widget>
				<Widget title="Year" name="gas-usage-by-year" icon={<FireIcon />}>
					<GasChart
						resolution={TimeSpan.Year}
						duration={Duration.fromDurationLike({ year: 5 })}
						end={DateTime.now()}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={500}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
