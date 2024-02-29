import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Alert> = {
	component: Alert,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Info: Story = {
	args: {
		children: 'No product registrations found',
	},
};

export const Warning: Story = {
	args: {
		severity: 'warning',
		children: 'Do not use for signing out and signing in participants',
	},
};

export const Error: Story = {
	args: {
		severity: 'error',
		children: 'Something went wrong, contact us for support',
	},
};

export const Success: Story = {
	args: {
		severity: 'success',
		children: 'Your request is send successfully',
	},
};
