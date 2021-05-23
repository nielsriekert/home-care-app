import styles from './Portal.module.css';
import React from 'react';

import { Link } from 'react-router-dom';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

import Button from '../../atoms/Button/Button';

import WidgetGrid from '../../organisms/WidgetGrid/WidgetGrid';

import Widget from '../../molecules/Widget/Widget';

import BoltArrowUpIcon from '../../atoms/BoltArrowUpIcon/BoltArrowUpIcon';
import BoltArrowDownIcon from '../../atoms/BoltArrowDownIcon/BoltArrowDownIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered/CurrentElectricityDelivered';

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
			</WidgetGrid>
		</LoggedOut>
	);
}
