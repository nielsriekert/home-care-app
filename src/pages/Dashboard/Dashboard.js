import './dashboard.css';
import React from 'react';

import Header from '../../components/Header/Header';

import Widget from '../../components/Widget/Widget';

import CurrentUsage from '../../CurrentUsage';
import ElectricityUsage from '../../ElectricityUsage';
import GasUsage from '../../GasUsage';
// import ElectricityUsageCurrentWeek from '../../ElectricityUsageCurrentWeek';
import ElectricityUsageMonth from '../../ElectricityUsageMonth';

function Dashboard() {
	return (
		<div className="App">
			<Header />
			<main className="page-container">
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
					{/* <Widget title="Electrical usage current week"  name="electrical-usage-current-week">
						<ElectricityUsageCurrentWeek />
					</Widget> */}
					<Widget title="Electrical usage by Month"  name="electrical-usage-by-month">
						<ElectricityUsageMonth />
					</Widget>
				</div>
			</main>
		</div>
	);
}

export default Dashboard;