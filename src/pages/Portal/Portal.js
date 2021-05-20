import styles from './Portal.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

import Button from '../../atoms/Button/Button';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../molecules/Widget/Widget';

import BoltIcon from '../../atoms/BoltIcon/BoltIcon';
import BoltArrowUpIcon from '../../atoms/BoltArrowUpIcon/BoltArrowUpIcon';
import BoltArrowDownIcon from '../../atoms/BoltArrowDownIcon/BoltArrowDownIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';
import FireIcon from '../../atoms/FireIcon/FireIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered/CurrentElectricityDelivered';
import ElectricityReceived from '../../molecules/ElectricityReceived/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered/ElectricityDelivered';
import GasUsage from '../../molecules/GasUsage/GasUsage';
import WaterUsage from '../../molecules/WaterUsage/WaterUsage';

import ElectricityMonthChart from '../../molecules/ElectricityMonthChart/ElectricityMonthChart';
import GasMonthChart from '../../molecules/GasMonthChart/GasMonthChart';

export default function Portal() {
	return (
		<LoggedOut>
			<h1 style={{ textAlign: 'center' }}>Home Care</h1>
			<div className={styles.loginButtonContainer}>
				<Link to="/login"><Button type="primary">Login</Button></Link>
			</div>
			<WidgetGrid>
				<Widget title="Receiving" name="current-electricity-usage" icon={<BoltArrowDownIcon />}>
					<CurrentElectricityReceived />
				</Widget>
				<Widget title="Delivering" name="current-electricity-delivered" icon={<BoltArrowUpIcon />}>
					<CurrentElectricityDelivered />
				</Widget>
				<Widget title="Today" name="electricity-usage" icon={<BoltArrowDownIcon />}>
					<ElectricityReceived />
				</Widget>
				<Widget title="Today" name="electricity-delivered" icon={<BoltArrowUpIcon />}>
					<ElectricityDelivered />
				</Widget>
				<Widget title="Today" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					<WaterUsage />
				</Widget>
				<Widget title="Month" name="electrical-usage-by-month" icon={<BoltIcon/>}>
					<ElectricityMonthChart />
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasMonthChart />
				</Widget>
			</WidgetGrid>
		</LoggedOut>
	);
}
