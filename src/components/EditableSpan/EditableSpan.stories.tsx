import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


export default {
  title: 'components/EditableSpan',
  component: EditableSpan,
  argTypes: {
    callback: {description:'EditableSpan clicked'},
    value: {
      description:'Start value EditableSpan',
      defaultValue:'TypeScript'
    }
  },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
  callback:action('EditableSpan clicked')
};
