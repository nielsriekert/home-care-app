import './dashboard.css';
import React, { useState, useCallback } from 'react';

import { DateTime } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import WaterIcon from '../../atoms/WaterIcon';

import WaterUsage from '../../molecules/WaterUsage';
import CumulativeWaterUsageChart from '../../molecules/CumulativeWaterUsageChart';
import WaterChart from '../../molecules/WaterChart';

import Button from '../../atoms/Button';

const getStartOfToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return Math.round(today.getTime() / 1000);
};

const getEndOfToday = () => {
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return Math.round(today.getTime() / 1000);
};

export default function Water() {
	const [waterChartDay, setWaterChartDay] = useState({
		start: getStartOfToday(),
		end: getEndOfToday()
	});

	const setMinus2 = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday() - (86400 * 2),
			end: getEndOfToday() - (86400 * 2)
		});
	}, [setWaterChartDay]);

	const setYesterday = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday() - 86400,
			end: getEndOfToday() - 86400
		});
	}, [setWaterChartDay]);

	const setToday = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday(),
			end: getEndOfToday()
		});
	}, [setWaterChartDay]);

	return (
		<Default title="Water">
			<WidgetGrid>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					<WaterUsage />
				</Widget>
				<Widget title="Today" name="cumulative-water-usage-chart" icon={<WaterIcon />}>
					<ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: '0' }}>
						<li><Button onClick={setMinus2} type="primary">-2</Button></li>
						<li><Button onClick={setYesterday} type="primary">Yesterday</Button></li>
						<li><Button onClick={setToday} type="primary">Today</Button></li>
					</ul>
					<CumulativeWaterUsageChart {...waterChartDay} />
				</Widget>
				<Widget title="Week" name="water-usage-current-week" icon={<WaterIcon />}>
					<WaterChart
						resolution="DAY"
						start={Math.floor(DateTime.now().startOf('week').toSeconds())}
						end={Math.floor(DateTime.now().endOf('week').toSeconds())}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
					/>
				</Widget>
				<Widget title="Month" name="water-usage-current-month" icon={<WaterIcon />}>
					<WaterChart
						resolution="MONTH"
						start={Math.floor(DateTime.now().minus({ month: 11 }).startOf('month').toSeconds())}
						end={Math.floor(DateTime.now().endOf('month').toSeconds())}
						timeFormat={{ month: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
					/>
				</Widget>
				<Widget title="Year" name="water-usage-current-year" icon={<WaterIcon />}>
					<WaterChart
						resolution="YEAR"
						start={Math.floor(DateTime.now().minus({ years: 4 }).toSeconds())}
						end={Math.floor(DateTime.now().endOf('year').toSeconds())}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={2}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
