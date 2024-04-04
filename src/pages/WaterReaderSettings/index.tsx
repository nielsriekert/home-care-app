import { useCallback, useEffect, useState, ReactNode } from 'react';

import { DateTime } from 'luxon';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';
import Form from '../../organisms/Form';
import InputField from '../../molecules/InputField';

import { useMutation, useQuery } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import Sensus620Image from './sensus-620.jpg';

import { graphql } from '../../types/graphql';

const AddVerifiedWaterReading_Mutation = graphql(`#graphql
	mutation addVerifiedWaterReading($reading: Int!) {
		addVerifiedWaterReading(reading: $reading)
	}
`);

const CurrentAndLastVerifiedWaterMeterReading_Query = graphql(`#graphql
	query currentWaterMeterReading {
		currentWaterMeterReading
		lastVerifiedWaterReading {
			readingAt
			reading
		}
	}
`);

export default function WaterReaderSettings() {
	const { loading: readingLoading, error: readingError, data: readingData } = useQuery(CurrentAndLastVerifiedWaterMeterReading_Query);
	const [addReading, { data, error, loading }] = useMutation(AddVerifiedWaterReading_Mutation, {
		refetchQueries: [CurrentAndLastVerifiedWaterMeterReading_Query]
	});
	const [fieldValue, setFieldValue] = useState('');
	const [fieldError, setFieldError] = useState('');
	const [successMessage, setSuccessMessage] = useState<ReactNode | null>(null);

	const onChange = useCallback((name, value) => {
		setFieldValue(value);
	}, [setFieldValue]);

	const onSubmit = useCallback(() => {
		if (!fieldValue) {
			setFieldError('No input or not a number');
			return;
		}

		addReading({
			variables: {
				reading: parseInt(fieldValue)
			}
		});
	}, [addReading, fieldValue]);

	useEffect(() => {
		if (data && typeof data.addVerifiedWaterReading === 'number') {
			setSuccessMessage(<p>Successfully added a water reading of <strong><FormattedNumber value={data.addVerifiedWaterReading} style="unit" unit="liter" /></strong></p>);
		}
	}, [data]);

	return (
		<Settings title="Water Reader">
			<p>
				The water sensor isn't 100% accurate. To correct the water meter reading count you can
				add a reading manually. The next reading will count up from the added manual reading.
			</p>
			<p>
				{readingLoading && <Skeleton />}
				{readingData && typeof readingData.currentWaterMeterReading === 'number' ?
					<Alert>
						The current water meter reading is <strong><FormattedNumber value={readingData.currentWaterMeterReading} style="unit" unit="liter" unitDisplay="long" /></strong>
					</Alert> :
					<Alert>
						No water reading found for the water meter
					</Alert>}
				{readingError &&
					<Alert severity="error">{readingError.message}</Alert>}
			</p>
			{readingData && readingData.lastVerifiedWaterReading &&
				<p>
					<Alert>
						The last verified water meter reading was at <strong>{DateTime.fromSeconds(readingData.lastVerifiedWaterReading.readingAt).toLocaleString(DateTime.DATE_FULL)}</strong> with a value of <strong><FormattedNumber value={readingData.lastVerifiedWaterReading.reading} style="unit" unit="liter" unitDisplay="long" /></strong>
					</Alert>
				</p>}
			<Form
				error={error}
				onSubmit={onSubmit}
				loading={loading}
				successMessage={successMessage}
				submitButtonText="Add"
			>
				<InputField
					name="reading"
					label="Water reading"
					type="number"
					onChange={onChange}
					value={fieldValue}
					isRequired
					message={fieldError ? {
						type: 'error',
						content: fieldError
					} : undefined}
					description={
						<div>
							<p>
								Input the current water level from the water meter
							</p>
							<p>
								<img src={Sensus620Image} alt="Sensus 620 water meter" />
							</p>
						</div>
					}
				/>
			</Form>
		</Settings>
	);
}