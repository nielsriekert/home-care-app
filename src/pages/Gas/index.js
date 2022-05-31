import React, { useState } from 'react';

import { DateTime } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import FireIcon from '../../atoms/FireIcon';

import GasUsage from '../../molecules/GasUsage';
import GasChart from '../../molecules/GasChart';

export default function Dashboard() {
	// TODO: weird solution, DateTime in props causes rerenders
	const [gasFourDaysStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ days: 4 }).toSeconds()),
		end: Math.floor(DateTime.now().toSeconds())
	});
	const [weekStartEnd] = useState({
		start: Math.floor(DateTime.now().startOf('week').toSeconds()),
		end: Math.floor(DateTime.now().endOf('week').toSeconds())
	});
	const [twelveMonthStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ month: 11 }).startOf('month').toSeconds()),
		end: Math.floor(DateTime.now().endOf('month').toSeconds())
	});
	const [fourYearsStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ years: 4 }).toSeconds()),
		end: Math.floor(DateTime.now().toSeconds())
	});

	return (
		<Default title="Gas">
			<WidgetGrid>
				<Widget title="Today" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Last 4 days" name="gas-usage-chart" icon={<FireIcon />}>
					<GasChart
						resolution="TWO_HOURS"
						start={gasFourDaysStartEnd.start}
						end={gasFourDaysStartEnd.end}
						chartType="column"
					/>
				</Widget>
				<Widget title="Week" name="gas-usage-current-week" icon={<FireIcon />}>
					<GasChart
						title="Week"
						resolution="DAY"
						start={weekStartEnd.start}
						end={weekStartEnd.end}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={1}
					/>
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasChart
						resolution="MONTH"
						start={twelveMonthStartEnd.start}
						end={twelveMonthStartEnd.end}
						chartType="column"
						timeFormat={{ month: 'long' }}
						includePrevious
						softMax={20}
					/>
				</Widget>
				<Widget title="Year" name="gas-usage-by-year" icon={<FireIcon />}>
					<GasChart
						resolution="YEAR"
						start={fourYearsStartEnd.start}
						end={fourYearsStartEnd.end}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={500}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
