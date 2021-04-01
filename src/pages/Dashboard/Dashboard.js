import './dashboard.css';
import React, { useState, useCallback } from 'react';

import Default from '../../templates/Default/Default';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../components/Widget/Widget';

import BoltIcon from '../../atoms/BoltIcon/BoltIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';
import FireIcon from '../../atoms/FireIcon/FireIcon';

import CurrentUsage from '../../CurrentUsage';
import ElectricityUsage from '../../molecules/ElectricityUsage/ElectricityUsage';
import WaterUsage from '../../molecules/WaterUsage/WaterUsage';
import ElectricityUsageChart from '../../ElectricityUsage';
import GasUsage from '../../GasUsage';
import CumulativeWaterUsageChart from '../../molecules/CumulativeWaterUsageChart/CumulativeWaterUsageChart';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';
import GasUsageMonth from '../../GasUsageMonth';

import Button from '../../atoms/Button/Button';

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

function Dashboard() {
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
		<Default>
			<WidgetGrid>
				<Widget title="Current" name="current-electricity-usage" icon={<BoltIcon />}>
					<CurrentUsage />
				</Widget>
				<Widget title="Today" name="electricity-usage" icon={<BoltIcon />}>
					<ElectricityUsage />
				</Widget>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					<WaterUsage />
				</Widget>
				<Widget title="Last 8 hours" name="electricity-usage-chart" icon={<BoltIcon />}>
					<ElectricityUsageChart resolution="FIVE_MINUTES" hoursInThePast={8} />
				</Widget>
				<Widget title="Last 4 days" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Today" name="cumulative-water-usage-chart" icon={<WaterIcon />}>
					<ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: '0' }}>
						<li><Button onClick={setMinus2} type="primary">-2</Button></li>
						<li><Button onClick={setYesterday} type="primary">Yesterday</Button></li>
						<li><Button onClick={setToday} type="primary">Today</Button></li>
					</ul>
					<CumulativeWaterUsageChart {...waterChartDay} />
				</Widget>
				<Widget title="Month" name="electrical-usage-by-month" icon={<BoltIcon />}>
					<ElectricityUsageMonth />
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasUsageMonth />
				</Widget>
			</WidgetGrid>
		</Default>
	);
}

export default Dashboard;