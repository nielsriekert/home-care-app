import styles from './Portal.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

import Button from '../../atoms/Button/Button';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../molecules/Widget/Widget';

import BoltIcon from '../../atoms/BoltIcon/BoltIcon';
import WaterIcon from '../../atoms/WaterIcon/WaterIcon';
import FireIcon from '../../atoms/FireIcon/FireIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered/CurrentElectricityDelivered';
import ElectricityReceived from '../../molecules/ElectricityReceived/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered/ElectricityDelivered';
import GasUsage from '../../molecules/GasUsage/GasUsage';
import WaterUsage from '../../molecules/WaterUsage/WaterUsage';

import ElectricityUsageMonth from '../../ElectricityUsageMonth';
import GasUsageMonth from '../../GasUsageMonth';

export default function Portal() {
	return (
		<LoggedOut>
			<h1 style={{ textAlign: 'center' }}>Home Care</h1>
			<div className={styles.loginButtonContainer}>
				<Link to="/login"><Button type="primary">Login</Button></Link>
			</div>
			<WidgetGrid>
				<Widget title="Current" name="current-electricity-usage" icon={<BoltIcon />}>
					<CurrentElectricityReceived />
				</Widget>
				<Widget title="Current" name="current-electricity-delivered" icon={<BoltIcon />}>
					<CurrentElectricityDelivered />
				</Widget>
				<Widget title="Today" name="electricity-usage" icon={<BoltIcon />}>
					<ElectricityReceived />
				</Widget>
				<Widget title="Today" name="electricity-delivered" icon={<BoltIcon />}>
					<ElectricityDelivered />
				</Widget>
				<Widget title="Today" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					<WaterUsage />
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
