import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {InputForm} from '../components/InputForm';
import {action} from '@storybook/addon-actions';
import {Task} from '../components/Task';
import {v1} from 'uuid';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {TaskType} from '../TodolistWithRedux';
import {AppRootReducerType} from '../state/store';


export default {
  title: 'components/Task',
  component: Task,
  decorators:[ReduxStoreProviderDecorator]
  // argTypes: {
  //   onClick:  'button clicked'
  // },
} as ComponentMeta<typeof Task>;

const TaskWithReduxStory = ()=>{
  let tasks = useSelector<AppRootReducerType, TaskType>(state => state.tasks['todolistId1'][1])
  return <Task task={tasks} todolistId={'todolistId1'}></Task>
}


const Template: ComponentStory<typeof Task> = (args) => <TaskWithReduxStory />;

export const TaskIsDoneStory = Template.bind({});

