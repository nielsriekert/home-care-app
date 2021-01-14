import './dashboard.css';
import React from 'react';

import Default from '../../templates/Default/Default';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../components/Widget/Widget';

import CurrentUsage from '../../CurrentUsage';
import ElectricityUsage from '../../ElectricityUsage';
import GasUsage from '../../GasUsage';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';

function Dashboard() {
	return (
		<Default>
			<WidgetGrid>
				<Widget title="Current Electricity Usage" name="current-electricity-usage">
					<CurrentUsage />
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
			</WidgetGrid>
		</Default>
	);
}

export default Dashboard;