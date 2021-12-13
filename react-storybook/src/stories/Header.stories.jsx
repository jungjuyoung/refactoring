import React from 'react';
import {actions} from '@storybook/addon-actions'

import { Header } from './Header';

export default {
  title: 'Unit/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const RegularHeader = Template.bind({});
RegularHeader.args = {
  user: {},
};
