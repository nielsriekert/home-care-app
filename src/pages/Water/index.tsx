import './dashboard.css';
import { useState, useEffect, useCallback } from 'react';

import { DateTime, Duration } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import WaterIcon from '../../atoms/icons/WaterIcon';

import WaterUsage from '../../molecules/WaterUsage';
import CumulativeWaterUsageChart from '../../molecules/CumulativeWaterUsageChart';
import WaterChart from '../../molecules/WaterChart';

import Button from '../../atoms/Button';

import { TimeSpan } from '../../types/graphql/graphql';

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
	const [today, setToday] = useState<{ start: number, end: number } | null>();
	const [waterChartDay, setWaterChartDay] = useState({
		start: getStartOfToday(),
		end: getEndOfToday()
	});

	useEffect(() => {
		setToday({
			start: DateTime.now().startOf('day').toUnixInteger(),
			end: DateTime.now().endOf('day').toUnixInteger(),
		});
	}, []);

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

	const setTodayWater = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday(),
			end: getEndOfToday()
		});
	}, [setWaterChartDay]);

	return (
		<Default title="Water">
			<WidgetGrid>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					{today && <WaterUsage
						start={today.start}
						end={today.end}
					/>}
				</Widget>
				<Widget title="Today" name="cumulative-water-usage-chart" icon={<WaterIcon />}>
					<ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: '0' }}>
						<li><Button onClick={setMinus2} type="primary">-2</Button></li>
						<li><Button onClick={setYesterday} type="primary">Yesterday</Button></li>
						<li><Button onClick={setTodayWater} type="primary">Today</Button></li>
					</ul>
					<CumulativeWaterUsageChart {...waterChartDay} />
				</Widget>
				<Widget title="Week" name="water-usage-current-week" icon={<WaterIcon />}>
					<WaterChart
						resolution={TimeSpan.Day}
						end={DateTime.now().endOf('week')}
						duration={Duration.fromDurationLike({ week: 1 })}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
					/>
				</Widget>
				<Widget title="Month" name="water-usage-current-month" icon={<WaterIcon />}>
					<WaterChart
						resolution={TimeSpan.Month}
						end={DateTime.now().endOf('month')}
						duration={Duration.fromDurationLike({ year: 1 })}
						timeFormat={{ month: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
					/>
				</Widget>
				<Widget title="Year" name="water-usage-current-year" icon={<WaterIcon />}>
					<WaterChart
						resolution={TimeSpan.Year}
						duration={Duration.fromDurationLike({ year: 5 })}
						end={DateTime.now().endOf('year')}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={2}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
