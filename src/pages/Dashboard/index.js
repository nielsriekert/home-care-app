import './dashboard.css';
import React, { useState } from 'react';

import { DateTime } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltArrowUpIcon from '../../atoms/icons/BoltArrowUpIcon';
import PowerPlugIcon from '../../atoms/icons/PowerPlugIcon';
import SunIcon from '../../atoms/icons/SunIcon';
import BoltArrowDownIcon from '../../atoms/icons/BoltArrowDownIcon';
import WaterIcon from '../../atoms/icons/WaterIcon';
import FireIcon from '../../atoms/icons/FireIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered';
import CurrentSolarPowerGenerating from '../../molecules/CurrentSolarPowerGenerating';
import CurrentElectricityUsing from '../../molecules/CurrentElectricityUsing';
import ElectricityReceived from '../../molecules/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered';
import ElectricityUsed from '../../molecules/ElectricityUsed';
import SolarPowerGenerated from '../../molecules/SolarPowerGenerated';
import GasUsage from '../../molecules/GasUsage';
import WaterUsage from '../../molecules/WaterUsage';

export default function Dashboard({ hasSolarInverter = false }) {
	const [updatedCurrentElectricityReceived, setUpdatedCurrentElectricityReceived] = useState(null);
	const [updatedCurrentElectricityDelivered, setUpdatedCurrentElectricityDelivered] = useState(null);
	const [updatedCurrentSolarPowerGenerated, setUpdatedCurrentSolarPowerGenerated] = useState(null);
	const [updatedCurrentElectricityUsing, setUpdatedCurrentElectricityUsing] = useState(null);
	// TODO: weird solution, DateTime in props causes rerenders
	const updatedAtCurrentElectricityReceived = (timestamp) =>{
		setUpdatedCurrentElectricityReceived(timestamp);
	};

	const updatedAtCurrentElectricityDelivered = (timestamp) =>{
		setUpdatedCurrentElectricityDelivered(timestamp);
	};

	const updatedAtCurrentSolarPowerGenerated = (timestamp) =>{
		setUpdatedCurrentSolarPowerGenerated(timestamp);
	};

	const updatedAtCurrentElectricityUsing = (timestamp) =>{
		setUpdatedCurrentElectricityUsing(timestamp);
	};

	return (
		<Default title="Dashboard">
			<WidgetGrid>
				<Widget title="Receiving" name="current-electricity-received" updatedAt={updatedCurrentElectricityReceived} icon={<BoltArrowDownIcon />}>
					<CurrentElectricityReceived updatedAt={updatedAtCurrentElectricityReceived} />
				</Widget>
				<Widget title="Delivering" name="current-electricity-delivered" updatedAt={updatedCurrentElectricityDelivered} icon={<BoltArrowUpIcon />}>
					<CurrentElectricityDelivered updatedAt={updatedAtCurrentElectricityDelivered} />
				</Widget>
				{hasSolarInverter && <Widget title="Solar generating" name="current-solar-generating" updatedAt={updatedCurrentSolarPowerGenerated} icon={<SunIcon />}>
					<CurrentSolarPowerGenerating updatedAt={updatedAtCurrentSolarPowerGenerated} />
				</Widget>}
				<Widget title="Using" name="current-electricity-using" updatedAt={updatedCurrentElectricityUsing} icon={<PowerPlugIcon />}>
					<CurrentElectricityUsing updatedAt={updatedAtCurrentElectricityUsing}  />
				</Widget>
				<Widget title="Today" name="electricity-usage" icon={<BoltArrowDownIcon />}>
					<ElectricityReceived />
				</Widget>
				<Widget title="Today" name="electricity-delivered" icon={<BoltArrowUpIcon />}>
					<ElectricityDelivered />
				</Widget>
				{hasSolarInverter && <Widget title="Today" name="solar-power-received" icon={<SunIcon />}>
					<SolarPowerGenerated
						start={DateTime.now().startOf('day').toUnixInteger()}
						end={DateTime.now().toUnixInteger()}
					/>
				</Widget>}
				<Widget title="Today" name="electricity-used" icon={<PowerPlugIcon />}>
					<ElectricityUsed />
				</Widget>
				<Widget title="Today" name="gas-usage" icon={<FireIcon />}>
					<GasUsage />
				</Widget>
				<Widget title="Today" name="water-usage" icon={<WaterIcon />}>
					<WaterUsage />
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
