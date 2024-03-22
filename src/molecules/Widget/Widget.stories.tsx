import type { Meta, StoryObj } from '@storybook/react';

import Widget from '.';

import BoltIcon from '../../atoms/icons/BoltIcon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Widget> = {
	component: Widget,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Widget>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Info: Story = {
	args: {
		title: 'Receiving',
		icon: <BoltIcon />,
		name: 'receiving',
		children: '-',
	},
};