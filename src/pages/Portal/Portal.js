import './portal.css';
import React from 'react';

import Widget from '../../components/Widget/Widget';

import CurrentUsage from '../../CurrentUsage';
import ElectricityUsage from '../../ElectricityUsage';
import GasUsage from '../../GasUsage';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';

function Portal() {
	return (
		<div className="App">
			<main className="page-container">
				<h1 style={{ 'text-align': 'center' }}>Home Care</h1>
				<div className="widgets-container">
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
				</div>
			</main>
		</div>
	);
}

export default Portal;