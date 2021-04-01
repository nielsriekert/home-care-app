import './portal.css';
import React from 'react';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

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

function Portal() {
	return (
		<LoggedOut>
			<h1 style={{ textAlign: 'center' }}>Home Care</h1>
			<WidgetGrid>
				<Widget title="Current Electricity Usage" name="current-electricity-usage">
					<CurrentUsage />
				</Widget>
				<Widget title="Today's electricity usage" name="electricity-usage">
					<ElectricityUsage />
				</Widget>
				<Widget title="Today's water usage" name="water-usage">
					<WaterUsage />
				</Widget>
				<Widget title="Electric Usage" name="electricity-usage-chart">
					<ElectricityUsageChart resolution="FIVE_MINUTES" hoursInThePast={8} />
				</Widget>
				<Widget title="Gas Usage" name="gas-usage">
					<GasUsage />
				</Widget>
				<Widget title="Water usage today" name="cumulative-water-usage-chart">
					<CumulativeWaterUsageChart/>
				</Widget>
				<Widget title="Electrical usage by Month"  name="electrical-usage-by-month">
					<ElectricityUsageMonth />
				</Widget>
				<Widget title="Gas usage by Month"  name="gas-usage-by-month">
					<GasUsageMonth />
				</Widget>
			</WidgetGrid>
		</LoggedOut>
	);
}

export default Portal;