import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		type: 'primary',
		children: 'Send',
	},
};

export const Secondary: Story = {
	args: {
		type: 'secondary',
		children: 'Cancel'
	},
};

export const PendingAndDisabled: Story = {
	args: {
		type: 'primary',
		isDisabled: true,
		pending: true,
		children: 'Submitting'
	},
};