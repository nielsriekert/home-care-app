import React from 'react';

import CurrentUsage from '../CurrentUsage';
import ElectricityUsage from '../ElectricityUsage';
import GasUsage from '../GasUsage';
import ElectricityUsageMonth from '../ElectricityUsageMonth';

function Dashboard() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Home Care</h1>
				<CurrentUsage />
				<ElectricityUsage resolution={'MINUTE'}/>
				<GasUsage />
				<ElectricityUsageMonth />
			</header>
		</div>
	);
}

export default Dashboard;