import type { Meta, StoryObj } from '@storybook/react';

import { TimeSpan } from '../../types/graphql/graphql';
import { Duration, DateTime } from 'luxon';

import GasChart, { GasExchangesChart_Query } from '.';

const duration = Duration.fromDurationLike({ hours: 1 });
const end = DateTime.fromObject({ day: 9, month: 3, year: 2024 });

const meta: Meta<typeof GasChart> = {
	component: GasChart,
	tags: ['autodocs'],
	parameters: {
		apolloClient: {
			mocks: [
				{
					request: {
						query: GasExchangesChart_Query,
						variables: {
							resolution: TimeSpan.Minute,
							timePeriod: {
								start: end.minus(duration).toUnixInteger(),
								end: end.toUnixInteger(),
							},
							timePeriodPrevious: {
								start: end.minus(duration).minus(duration).toUnixInteger(),
								end: end.minus(duration).toUnixInteger()
							},
							includePrevious: false,
						},
					},
					result: {
						data: {
							gasExchanges: [
								// {
								// 	received: 0.105,
								// 	dataPointsCount: 24,
								// 	period: {
								// 		start: 1709420400,
								// 		end: 1709506800,
								// 		__typename: 'TimePeriod'
								// 	},
								// 	__typename: 'GasExchange'
								// },
								{
									received: 0.785,
									dataPointsCount: 24,
									period: {
										start: 1709506800,
										end: 1709593200,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0.289,
									dataPointsCount: 24,
									period: {
										start: 1709593200,
										end: 1709679600,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 1.065,
									dataPointsCount: 24,
									period: {
										start: 1709679600,
										end: 1709766000,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 1.803,
									dataPointsCount: 19,
									period: {
										start: 1709766000,
										end: 1709852400,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0,
									dataPointsCount: 0,
									period: {
										start: 1709852400,
										end: 1709938800,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0,
									dataPointsCount: 0,
									period: {
										start: 1709938800,
										end: 1710025200,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0,
									dataPointsCount: 0,
									period: {
										start: 1710025200,
										end: 1710111600,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								}
							],
							gasExchangesPrevious: [
								{
									received: 2.096,
									dataPointsCount: 24,
									period: {
										start: 1708815600,
										end: 1708902000,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 2.69,
									dataPointsCount: 24,
									period: {
										start: 1708902000,
										end: 1708988400,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 3.812,
									dataPointsCount: 23,
									period: {
										start: 1708988400,
										end: 1709074800,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 2.464,
									dataPointsCount: 24,
									period: {
										start: 1709074800,
										end: 1709161200,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 2.603,
									dataPointsCount: 23,
									period: {
										start: 1709161200,
										end: 1709247600,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0.387,
									dataPointsCount: 24,
									period: {
										start: 1709247600,
										end: 1709334000,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0.289,
									dataPointsCount: 23,
									period: {
										start: 1709334000,
										end: 1709420400,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								},
								{
									received: 0.105,
									dataPointsCount: 24,
									period: {
										start: 1709420400,
										end: 1709506800,
										__typename: 'TimePeriod'
									},
									__typename: 'GasExchange'
								}
							]
						}
					},
				},
			]
		}
	},
	args: {
		title: 'Week',
		resolution: TimeSpan.Minute,
		duration,
		end,
		chartType: 'column',
	}
};

export default meta;
type Story = StoryObj<typeof GasChart>;

export const Week: Story = {
	args: {

	},
};