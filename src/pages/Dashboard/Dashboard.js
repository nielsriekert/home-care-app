import './dashboard.css';
import React from 'react';

import Default from '../../templates/Default/Default';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../components/Widget/Widget';

import CurrentUsage from '../../CurrentUsage';
import CurrentWaterConsumption from '../../CurrentWaterConsumption';
import ElectricityUsage from '../../ElectricityUsage';
import GasUsage from '../../GasUsage';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';
import GasUsageMonth from '../../GasUsageMonth';

function Dashboard() {
	return (
		<Default>
			<WidgetGrid>
				<Widget title="Current Electricity Usage" name="current-electricity-usage">
					<CurrentUsage />
				</Widget>
				<Widget title="Current Water Consumption" name="current-water-consumption">
					<CurrentWaterConsumption />
				</Widget>
				<Widget title="Electric Usage" name="electricity-usage">
					<ElectricityUsage resolution="FIVE_MINUTES" hoursInThePast={8} />
				</Widget>
				<Widget title="Gas Usage" name="gas-usage">
					<GasUsage />
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