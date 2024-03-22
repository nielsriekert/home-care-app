import type { Meta, StoryObj } from '@storybook/react';

import FieldMessage from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FieldMessage> = {
	component: FieldMessage,
	tags: ['autodocs'],
	parameters: {
		backgrounds: {
			default: 'quinary',
		}
	},
	args: {
		children: 'Vanuit de functie "Student" stellen we deze rol voor'
	},
};

export default meta;
type Story = StoryObj<typeof FieldMessage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {

};

export const error: Story = {
	args: {
		styleType: 'error',
		children: 'Het e-mailadres is niet correct'
	},
};

export const validated: Story = {
	args: {
		styleType: 'validated',
		children: 'Deze coupon code kan gebruikt worden'
	},
};