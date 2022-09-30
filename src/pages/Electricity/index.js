import React, { useState } from 'react';

import { DateTime } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltIcon from '../../atoms/BoltIcon';
import BoltArrowUpIcon from '../../atoms/BoltArrowUpIcon';
import PowerPlugIcon from '../../atoms/PowerPlugIcon';
import BoltArrowDownIcon from '../../atoms/BoltArrowDownIcon';
import SunIcon from '../../atoms/SunIcon';

import ElectricityReceived from '../../molecules/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered';
import ElectricityUsed from '../../molecules/ElectricityUsed';
import ElectricityChart from '../../molecules/ElectricityChart';
import CurrentSolarPowerGenerated from '../../molecules/SolarPowerGenerated';

export default function Electricity({ hasSolarInverter = false }) {
	// TODO: weird solution, DateTime in props causes rerenders
	const [electricityEightHourStartEnd] = useState({
		start: Math.floor(DateTime.now().minus({ hours: 8 }).toSeconds()),
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

	return (
		<Default title="Electricity">
			<WidgetGrid>
				<Widget title="Today" name="electricity-usage" icon={<BoltArrowDownIcon />}>
					<ElectricityReceived />
				</Widget>
				<Widget title="Today" name="electricity-delivered" icon={<BoltArrowUpIcon />}>
					<ElectricityDelivered />
				</Widget>
				<Widget title="Today" name="electricity-used" icon={<PowerPlugIcon />}>
					<ElectricityUsed />
				</Widget>
				{hasSolarInverter && <Widget title="Today" name="solar-power-received" icon={<SunIcon />}>
					<CurrentSolarPowerGenerated />
				</Widget>}
				<Widget title="Last 8 hours" name="electricity-usage-chart" icon={<BoltIcon />}>
					<ElectricityChart
						resolution="FIVE_MINUTES"
						start={electricityEightHourStartEnd.start}
						end={electricityEightHourStartEnd.end}
						unit="WATT_HOUR"
						softMax={100}
						includeSolarPower={hasSolarInverter}
					/>
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
						includeSolarPower={hasSolarInverter}
					/>
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
			</WidgetGrid>
		</Default>
	);
}
