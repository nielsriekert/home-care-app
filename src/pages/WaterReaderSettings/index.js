import React, { useCallback, useEffect, useState } from 'react';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';
import Message from '../../atoms/Message';
import Form from '../../organisms/Form';
import InputField from '../../molecules/InputField';

import { useMutation, gql, useQuery } from '@apollo/client';
import { FormattedNumber } from 'react-intl';

import Sensus620Image from './sensus-620.jpg';

const ADD_VERIFIED_WATER_READING = gql`
	mutation addVerifiedWaterReading($reading: Int!) {
		addVerifiedWaterReading(reading: $reading)
	}
`;

const CURRENT_WATER_METER_READING = gql`
	query currentWaterMeterReading {
		currentWaterMeterReading
	}
`;

export default function WaterReaderSettings() {
	const { loading: readingLoading, error: readingError, data: readingData } = useQuery(CURRENT_WATER_METER_READING);
	const [addReading, { data, error, loading }] = useMutation(ADD_VERIFIED_WATER_READING);
	const [fieldValue, setFieldValue] = useState('');
	const [fieldError, setFieldError] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);

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
				{!readingLoading && readingData ?
					typeof readingData.currentWaterMeterReading === 'number' ?
						<Message>
							The current water meter reading is <strong><FormattedNumber value={readingData.currentWaterMeterReading} style="unit" unit="liter" unitDisplay="long" /></strong>
						</Message> :
						<Message>
							No actual water reading found for the water meter
						</Message> :
					readingError ?
						<Message type="error">{readingError.message}</Message> :
						<Skeleton />}
			</p>
			<Form
				error={error}
				onSubmit={onSubmit}
				isLoading={loading}
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
						type: 'isError',
						content: fieldError
					} : false}
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