import './dashboard.css';
import React, { useState, useCallback } from 'react';

import { DateTime } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltIcon from '../../atoms/BoltIcon';
import BoltArrowUpIcon from '../../atoms/BoltArrowUpIcon';
import PowerPlugIcon from '../../atoms/PowerPlugIcon';
import SunIcon from '../../atoms/SunIcon';
import BoltArrowDownIcon from '../../atoms/BoltArrowDownIcon';
import WaterIcon from '../../atoms/WaterIcon';
import FireIcon from '../../atoms/FireIcon';

import CurrentElectricityReceived from '../../molecules/CurrentElectricityReceived';
import CurrentElectricityDelivered from '../../molecules/CurrentElectricityDelivered';
import CurrentSolarPowerGenerating from '../../molecules/CurrentSolarPowerGenerating';
import CurrentElectricityUsing from '../../molecules/CurrentElectricityUsing';
import ElectricityReceived from '../../molecules/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered';
import ElectricityUsed from '../../molecules/ElectricityUsed';
import CurrentSolarPowerGenerated from '../../molecules/SolarPowerGenerated';
import GasUsage from '../../molecules/GasUsage';
import WaterUsage from '../../molecules/WaterUsage';
import ElectricityChart from '../../molecules/ElectricityChart';
import GasChart from '../../molecules/GasChart';
import CumulativeWaterUsageChart from '../../molecules/CumulativeWaterUsageChart';
import WaterReceivedWeekChart from '../../molecules/WaterReceivedWeekChart';

import Button from '../../atoms/Button';

const getStartOfToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return Math.round(today.getTime() / 1000);
};

const getEndOfToday = () => {
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return Math.round(today.getTime() / 1000);
};

export default function Dashboard({ hasSolarInverts = false }) {
	const [updatedCurrentElectricityReceived, setUpdatedCurrentElectricityReceived] = useState(null);
	const [updatedCurrentElectricityDelivered, setUpdatedCurrentElectricityDelivered] = useState(null);
	const [updatedCurrentSolarPowerGenerated, setUpdatedCurrentSolarPowerGenerated] = useState(null);
	const [updatedCurrentElectricityUsing, setUpdatedCurrentElectricityUsing] = useState(null);
	// TODO: weird solution, DateTime in props causes rerenders
	const [electricityEightHourStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ hours: 8 }).toSeconds()),
		end: Math.floor(DateTime.now().toSeconds())
	});
	const [gasFourDaysStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ days: 4 }).toSeconds()),
		end: Math.floor(DateTime.now().toSeconds())
	});
	const [weekStartEnd] = useState({
		start: Math.floor(DateTime.now().startOf('week').toSeconds()),
		end: Math.floor(DateTime.now().endOf('week').toSeconds())
	});
	const [twelveMonthStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ month: 11 }).startOf('month').toSeconds()),
		end: Math.floor(DateTime.now().endOf('month').toSeconds())
	});
	const [fourYearsStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ years: 4 }).toSeconds()),
		end: Math.floor(DateTime.now().toSeconds())
	});

	const [waterChartDay, setWaterChartDay] = useState({
		start: getStartOfToday(),
		end: getEndOfToday()
	});

	const setMinus2 = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday() - (86400 * 2),
			end: getEndOfToday() - (86400 * 2)
		});
	}, [setWaterChartDay]);

	const setYesterday = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday() - 86400,
			end: getEndOfToday() - 86400
		});
	}, [setWaterChartDay]);

	const setToday = useCallback(() => {
		setWaterChartDay({
			start: getStartOfToday(),
			end: getEndOfToday()
		});
	}, [setWaterChartDay]);

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
		<Default>
			<WidgetGrid>
				<Widget title="Receiving" name="current-electricity-received" updatedAt={updatedCurrentElectricityReceived} icon={<BoltArrowDownIcon />}>
					<CurrentElectricityReceived updatedAt={updatedAtCurrentElectricityReceived} />
				</Widget>
				<Widget title="Delivering" name="current-electricity-delivered" updatedAt={updatedCurrentElectricityDelivered} icon={<BoltArrowUpIcon />}>
					<CurrentElectricityDelivered updatedAt={updatedAtCurrentElectricityDelivered}  />
				</Widget>
				{hasSolarInverts && <Widget title="Solar generating" name="current-solar-generating" updatedAt={updatedCurrentSolarPowerGenerated} icon={<SunIcon />}>
					<CurrentSolarPowerGenerating updatedAt={updatedAtCurrentSolarPowerGenerated}  />
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
				{hasSolarInverts && <Widget title="Today" name="solar-power-received" icon={<SunIcon />}>
					<CurrentSolarPowerGenerated />
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
				<Widget title="Last 8 hours" name="electricity-usage-chart" icon={<BoltIcon />}>
					<ElectricityChart
						resolution="FIVE_MINUTES"
						start={electricityEightHourStartEnd.start}
						end={electricityEightHourStartEnd.end}
						unit="WATT_HOUR"
						softMax={100}
					/>
				</Widget>
				<Widget title="Last 4 days" name="gas-usage-chart" icon={<FireIcon />}>
					<GasChart
						resolution="TWO_HOURS"
						start={gasFourDaysStartEnd.start}
						end={gasFourDaysStartEnd.end}
						chartType="column"
					/>
				</Widget>
				<Widget title="Today" name="cumulative-water-usage-chart" icon={<WaterIcon />}>
					<ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: '0' }}>
						<li><Button onClick={setMinus2} type="primary">-2</Button></li>
						<li><Button onClick={setYesterday} type="primary">Yesterday</Button></li>
						<li><Button onClick={setToday} type="primary">Today</Button></li>
					</ul>
					<CumulativeWaterUsageChart {...waterChartDay} />
				</Widget>
				<Widget title="Week" name="electrical-usage-current-week" icon={<BoltIcon />}>
					<ElectricityChart
						resolution="DAY"
						start={weekStartEnd.start}
						end={weekStartEnd.end}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
					/>
				</Widget>
				<Widget title="Week" name="gas-usage-current-week" icon={<FireIcon />}>
					<GasChart
						title="Week"
						resolution="DAY"
						start={weekStartEnd.start}
						end={weekStartEnd.end}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={1}
					/>
				</Widget>
				<Widget title="Week" name="water-usage-current-week" icon={<WaterIcon />}>
					<WaterReceivedWeekChart />
				</Widget>
				<Widget title="Month" name="electrical-usage-by-month" icon={<BoltIcon />}>
					<ElectricityChart
						resolution="MONTH"
						start={twelveMonthStartEnd.start}
						end={twelveMonthStartEnd.end}
						timeFormat={{ month: 'long' }}
						chartType="column"
						softMax={200}
					/>
				</Widget>
				<Widget title="Month" name="gas-usage-by-month" icon={<FireIcon />}>
					<GasChart
						resolution="MONTH"
						start={twelveMonthStartEnd.start}
						end={twelveMonthStartEnd.end}
						chartType="column"
						timeFormat={{ month: 'long' }}
						includePrevious
						softMax={20}
					/>
				</Widget>
				<Widget title="Year" name="electrical-usage-by-year" icon={<BoltIcon />}>
					<ElectricityChart
						resolution="YEAR"
						start={fourYearsStartEnd.start}
						end={fourYearsStartEnd.end}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={1500}
					/>
				</Widget>
				<Widget title="Year" name="gas-usage-by-year" icon={<FireIcon />}>
					<GasChart
						resolution="YEAR"
						start={fourYearsStartEnd.start}
						end={fourYearsStartEnd.end}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={500}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
