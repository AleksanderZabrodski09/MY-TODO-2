import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootReducerType} from '../../app/store';
import {TaskType} from '../../api/todolist-api';


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

export const TaskStatusStory = Template.bind({});

