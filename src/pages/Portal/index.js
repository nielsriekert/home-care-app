import styles from './Portal.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

import LoggedOut from '../../templates/LoggedOut';

import Button from '../../atoms/Button';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltArrowUpIcon from '../../atoms/BoltArrowUpIcon';
import BoltArrowDownIcon from '../../atoms/BoltArrowDownIcon';
import SunIcon from '../../atoms/SunIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered';
import CurrentSolarPowerGenerating from '../../molecules/CurrentSolarPowerGenerating';

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
				<Widget title="Solar generating" name="current-solar-generating" icon={<SunIcon />}>
					<CurrentSolarPowerGenerating />
				</Widget>
			</WidgetGrid>
		</LoggedOut>
	);
}
