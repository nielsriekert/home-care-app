import styles from './Portal.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

import LoggedOut from '../../templates/LoggedOut';

import Button from '../../atoms/Button';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltArrowUpIcon from '../../atoms/icons/BoltArrowUpIcon';
import BoltArrowDownIcon from '../../atoms/icons/BoltArrowDownIcon';
import SunIcon from '../../atoms/icons/SunIcon';
import PowerPlugIcon from '../../atoms/icons/PowerPlugIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered';
import CurrentSolarPowerGenerating from '../../molecules/CurrentSolarPowerGenerating';
import CurrentElectricityUsing from '../../molecules/CurrentElectricityUsing';

export default function Portal({ hasSolarInverter = false }) {
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
				{hasSolarInverter && <Widget title="Solar generating" name="current-solar-generating" icon={<SunIcon />}>
					<CurrentSolarPowerGenerating />
				</Widget>}
				<Widget title="Using" name="current-electricity-using" icon={<PowerPlugIcon />}>
					<CurrentElectricityUsing />
				</Widget>
			</WidgetGrid>
		</LoggedOut>
	);
}
