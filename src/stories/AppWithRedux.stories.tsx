import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


export default {
  title: 'components/AppWithRedux',
  component: AppWithRedux,
  // argTypes: { },
  decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) =>  <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});


