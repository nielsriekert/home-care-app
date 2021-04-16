import React, { useCallback, useEffect, useState } from 'react';

import Settings from '../../templates/Settings/Settings';

import Form from '../../organisms/Form/Form';
import InputField from '../../molecules/InputField/InputField';

import { useMutation, gql } from '@apollo/client';

import Sensus620Image from './sensus-620.jpg';

const ADD_VERIFIED_WATER_READING = gql`
	mutation addVerifiedWaterReading($reading: Int!) {
		addVerifiedWaterReading(reading: $reading)
	}
`;

export default function WaterReaderSettings() {
	const [addReading, { data, error, loading }] = useMutation(ADD_VERIFIED_WATER_READING);
	const [fieldValue, setFieldValue] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);

	const onChange = useCallback((name, value) => {
		setFieldValue(value);
	}, [setFieldValue]);

	const onSubmit = useCallback(() => {
		addReading({
			variables: {
				reading: parseInt(fieldValue)
			}
		});
	}, [addReading, fieldValue]);

	useEffect(() => {
		if (data && typeof data.addVerifiedWaterReading === 'number') {
			setSuccessMessage(<p>Successfully added a water reading of <strong>{data.addVerifiedWaterReading}</strong></p>);
		}
	}, [data]);

	return (
		<Settings title="Water Reader">
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