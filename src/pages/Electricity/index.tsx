import { DateTime, Duration } from 'luxon';

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

import { TimeSpan, ElectricEnergyOverTimeUnit } from '../../types/graphql/graphql';

export default function Electricity({ hasSolarInverter = false }) {
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
						resolution={TimeSpan.FiveMinutes}
						end={DateTime.now()}
						duration={Duration.fromDurationLike({ hours: 8 })}
						unit={ElectricEnergyOverTimeUnit.WattHour}
						chartType="area"
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
						duration={Duration.fromDurationLike({ year: 1 })}
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
