import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { gql } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';

import CurrentUsage from '../components/CurrentUsage';
import ElectricityUsage from '../components/ElectricityUsage';
import GasUsage from '../components/GasUsage';

const DASHBOARD = gql`
	query DashBoard($resolutionElectricity: TimeResolution $resolutionGas: TimeResolution) {
		currentElectricityUsage

		electricityUsage(resolution: $resolutionElectricity) {
			delivered
			received
			period {
				start
				end
			}
		}

		gasUsage(resolution: $resolutionGas) {
			received
			period {
				start
				end
			}
		}
	}
`;

export default function Home({ currentElectricityUsage, electricityUsage, gasUsage }) {
	// const { loading, error, data } = useQuery(CURRENT_ELECTRIC_USAGE);

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error :(</p>;

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Home Care
				</h1>

				<CurrentUsage currentElectricityUsage={currentElectricityUsage} />
				<ElectricityUsage electricityUsage={electricityUsage} />
				<GasUsage gasUsage={gasUsage} />

			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query({
		query: DASHBOARD,
		variables: {
			resolutionElectricity: 'TEN_MINUTES',
			resolutionGas: null
		}
	});

	return {
		props: {
			currentElectricityUsage: data.currentElectricityUsage,
			electricityUsage: data.electricityUsage,
			gasUsage: data.gasUsage,
		},
	};
}
