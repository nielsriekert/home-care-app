import './portal.css';
import React from 'react';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../components/Widget/Widget';

import BoltIcon from '../../atoms/BoltIcon/BoltIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';
import FireIcon from '../../atoms/FireIcon/FireIcon';

import CurrentUsage from '../../CurrentUsage';
import ElectricityUsage from '../../molecules/ElectricityUsage/ElectricityUsage';
import WaterUsage from '../../molecules/WaterUsage/WaterUsage';
import ElectricityUsageChart from '../../ElectricityUsage';
import GasUsageChart from '../../GasUsage';
import CumulativeWaterUsageChart from '../../molecules/CumulativeWaterUsageChart/CumulativeWaterUsageChart';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';
import GasUsageMonth from '../../GasUsageMonth';

function Portal() {
	return (
		<LoggedOut>
			<h1 style={{ textAlign: 'center' }}>Home Care</h1>
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
				<Widget title="Last 4 days" name="gas-usage-chart" icon={<FireIcon />}>
					<GasUsageChart />
				</Widget>
				<Widget title="Today" name="cumulative-water-usage-chart" icon={<WaterIcon />}>
					<CumulativeWaterUsageChart/>
				</Widget>
				<Widget title="Month" name="electrical-usage-by-month" icon={<BoltIcon />}>
					<ElectricityUsageMonth />
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasUsageMonth />
				</Widget>
			</WidgetGrid>
		</LoggedOut>
	);
}

export default Portal;