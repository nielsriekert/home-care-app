import React, { useState, useEffect } from 'react';
import styles from './SolarInvertersSettings.module.css';

import Settings from '../../templates/Settings';

import Skeleton from '../../atoms/Skeleton';
import Alert from '../../atoms/Alert';

import SolarInverterCard from '../../molecules/SolarInverterCard';

import Form from '../../organisms/Form';
import InputField from '../../molecules/InputField';
import SelectField from '../../molecules/SelectField';

import { useMutation, useQuery } from '@apollo/client';

import useFormFields from '../../hooks/useFormFields';

import { graphql } from '../../types/graphql';

const SolarInverters_Query = graphql(`#graphql
	query solarInverters {
		solarInverters {
			...SolarInverterCardFragment
		}
	}
`);

const AddSolarInverter_Mutation = graphql(`#graphql
	mutation addSolarInverter($solarInverter: SolarInverterInput!) {
		addSolarInverter(solarInverter: $solarInverter) {
			name
		}
	}
`);

export default function SolarInvertersSettings() {
	const { data: invertersData, loading: loadingInverters, error: errorInverters, refetch } = useQuery(SolarInverters_Query, {
		pollInterval: 30000
	});
	const [addInverter, { data: inverterData, error: inverterError, loading: inverterLoading }] = useMutation(AddSolarInverter_Mutation);
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const [{
		getFieldValueByName,
		setFieldValueByName,
		areAllFieldsValid
	}, fields] = useFormFields([
		{
			label: 'Name',
			name: 'name',
			value: '',
			component: InputField
		},
		{
			label: 'Solar Inverter',
			name: 'type',
			value: '',
			choices: [
				{
					label: '- select solar inverter -',
					value: ''
				},
				{
					label: 'SMA - Sunny Boy',
					value: 'SMA_SUNNY_BOY'
				},
				{
					label: 'Omnik',
					value: 'OMNIK'
				}
			],
			component: SelectField
		},
		{
			label: 'Url',
			name: 'url',
			value: '',
			description: 'The url from the solar inverter',
			component: InputField
		}
	]);

	useEffect(() => {
		if (inverterData) {
			setSuccessMessage(<p>Successfully added <strong>{inverterData.addSolarInverter.name}</strong></p>);
			// TODO: should not be needed
			refetch();
		}
	}, [inverterData, refetch]);

	const onSubmit = () => {
		if (!areAllFieldsValid()) {
			setError(new Error('Fill in all required fields'));
			return;
		}

		setError(null);

		addInverter({
			variables: {
				solarInverter: {
					name: getFieldValueByName('name'),
					url: getFieldValueByName('url'),
					type: getFieldValueByName('type') || null
				}
			}
		});
	};

	return (
		<Settings title="Solar Inverters">
			<p>
				You can add solar inverters here and view their statuses.
			</p>
			{loadingInverters && <div className={styles.inverterGrid}>
				<Skeleton width="100%" height="300px" />
				<Skeleton width="100%" height="300px" />
			</div>}
			{!loadingInverters && invertersData?.solarInverters && <div className={styles.inverterGrid}>
				{invertersData.solarInverters.length > 0 ? invertersData.solarInverters.map(inverter => (
					<SolarInverterCard key={inverter.id} solarInverter={inverter} />
				)) :
					<Alert>No solar inverters found</Alert>
				}
			</div>}
			{errorInverters && <Alert severity="error">{errorInverters.message}</Alert>}
			<div className={styles.addFormContainer}>
				<h2>Add Solar Inverter</h2>
				<Form
					title="Add Solar Inverter"
					isLoading={inverterLoading}
					isSubmitting={inverterLoading}
					successMessage={successMessage}
					error={inverterError || error}
					onSubmit={onSubmit}
					submitButtonText="Add Inverter"
				>
					{fields.map(field => (
						<field.component
							{...field}
							key={field.name}
							value={getFieldValueByName(field.name)}
							onChange={setFieldValueByName}
						/>
					))}
				</Form>
			</div>
		</Settings>
	);
}