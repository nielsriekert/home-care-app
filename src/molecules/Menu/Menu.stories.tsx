import type { Meta, StoryObj } from '@storybook/react';

import Menu from '.';

import MenuItem from '../../atoms/MenuItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Menu> = {
	component: Menu,
	tags: ['autodocs'],
	args: {
		children: <><MenuItem >Aanvragen</MenuItem><MenuItem >Exporteer als csv</MenuItem></>
	}
};

export default meta;
type Story = StoryObj<typeof Menu>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {

};
