import './dashboard.css';
import React, { useState, useCallback } from 'react';

import Default from '../../templates/Default/Default';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../components/Widget/Widget';

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
				<Widget title="Current Electricity Usage" name="current-electricity-usage">
					<CurrentUsage />
				</Widget>
				<Widget title="Today" name="electricity-usage">
					<ElectricityUsage />
				</Widget>
				<Widget title="Today" name="water-usage">
					<WaterUsage />
				</Widget>
				<Widget title="Electric Usage" name="electricity-usage-chart">
					<ElectricityUsageChart resolution="FIVE_MINUTES" hoursInThePast={8} />
				</Widget>
				<Widget title="Gas Usage" name="gas-usage">
					<GasUsage />
				</Widget>
				<Widget title="Water usage today" name="cumulative-water-usage-chart">
					<ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: '0' }}>
						<li><Button onClick={setMinus2} type="primary">-2</Button></li>
						<li><Button onClick={setYesterday} type="primary">Yesterday</Button></li>
						<li><Button onClick={setToday} type="primary">Today</Button></li>
					</ul>
					<CumulativeWaterUsageChart {...waterChartDay} />
				</Widget>
				<Widget title="Electrical usage by Month"  name="electrical-usage-by-month">
					<ElectricityUsageMonth />
				</Widget>
				<Widget title="Gas usage by Month"  name="gas-usage-by-month">
					<GasUsageMonth />
				</Widget>
			</WidgetGrid>
		</Default>
	);
}

export default Dashboard;