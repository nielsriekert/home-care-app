import { useState, useEffect } from 'react';

import { DateTime, Duration } from 'luxon';

import Default from '../../templates/Default';

import WidgetGrid from '../../organisms/WidgetGrid';

import Widget from '../../molecules/Widget';

import BoltIcon from '../../atoms/icons/BoltIcon';
import BoltArrowUpIcon from '../../atoms/icons/BoltArrowUpIcon';
import PowerPlugIcon from '../../atoms/icons/PowerPlugIcon';
import BoltArrowDownIcon from '../../atoms/icons/BoltArrowDownIcon';
import SunIcon from '../../atoms/icons/SunIcon';

import ElectricityReceived from '../../molecules/ElectricityReceived';
import ElectricityDelivered from '../../molecules/ElectricityDelivered';
import ElectricityUsed from '../../molecules/ElectricityUsed';
import ElectricityChart from '../../molecules/ElectricityChart';
import SolarPowerGenerated from '../../molecules/SolarPowerGenerated';

import { TimeSpan, ElectricEnergyOverTimeUnit } from '../../types/graphql/graphql';

export default function Electricity({ hasSolarInverter = false }) {
	const [today, setToday] = useState<{ start: number, end: number } | null>();

	useEffect(() => {
		setToday({
			start: DateTime.now().startOf('day').toUnixInteger(),
			end: DateTime.now().endOf('day').toUnixInteger(),
		});
	}, []);

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
					{today && <ElectricityUsed
						start={today.start}
						end={today.end}
					/>}
				</Widget>
				{hasSolarInverter && <Widget title="Today" name="solar-power-received" icon={<SunIcon />}>
					{today && <SolarPowerGenerated
						start={today.start}
						end={today.end}
					/>}
				</Widget>}
				<Widget title="Last 10 hours" name="electricity-usage-chart" icon={<BoltIcon />}>
					<ElectricityChart
						resolution={TimeSpan.FiveMinutes}
						end={DateTime.now()}
						duration={Duration.fromDurationLike({ hours: 10 })}
						unit={ElectricEnergyOverTimeUnit.WattHour}
						chartType="line"
						softMax={100}
						includeSolarPower={hasSolarInverter}
					/>
				</Widget>
				<Widget title="Week" name="electrical-usage-current-week" icon={<BoltIcon />}>
					<ElectricityChart
						resolution={TimeSpan.Day}
						end={DateTime.now().endOf('week')}
						duration={Duration.fromDurationLike({ week: 1 })}
						timeFormat={{ weekday: 'long' }}
						chartType="column"
						includePrevious
						softMax={2}
						includeSolarPower={hasSolarInverter}
					/>
				</Widget>
				<Widget title="Month" name="electrical-usage-by-month" icon={<BoltIcon />}>
					<ElectricityChart
						resolution={TimeSpan.Month}
						end={DateTime.now().endOf('month')}
						duration={Duration.fromDurationLike({ year: 1 }).minus({ month: 1 })}
						timeFormat={{ month: 'long' }}
						chartType="column"
						softMax={200}
						includeSolarPower={hasSolarInverter}
					/>
				</Widget>
				<Widget title="Year" name="electrical-usage-by-year" icon={<BoltIcon />}>
					<ElectricityChart
						resolution={TimeSpan.Year}
						end={DateTime.now()}
						duration={Duration.fromDurationLike({ year: 5 })}
						timeFormat={{ year: 'numeric' }}
						chartType="column"
						softMax={1500}
						includeSolarPower={hasSolarInverter}
					/>
				</Widget>
			</WidgetGrid>
		</Default>
	);
}
