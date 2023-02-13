import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {InputForm} from './InputForm';
import {action} from '@storybook/addon-actions';


export default {
  title: 'components/InputForm',
  component: InputForm,
  argTypes: {
    onClick:  'button clicked'
  },
} as ComponentMeta<typeof InputForm>;


const Template: ComponentStory<typeof InputForm> = (args) => <InputForm {...args} />;

export const InputFormStory = Template.bind({});
InputFormStory.args = {
  addInput:action('button clicked')
};

