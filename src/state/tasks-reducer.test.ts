import { TasksStateType} from '../App';

import {addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';


let startState:TasksStateType

beforeEach(()=>{
  startState={
    'todolistId1': [
      {id: '1', title: 'CSS', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: 'JS', status: TaskStatuses.Completed,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: 'React', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: 'milk', status: TaskStatuses.Completed,  order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: 'tea', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  }
})

test('correct task should be removed', () => {


  const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2'))

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', status: TaskStatuses.New ,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: 'JS', status: TaskStatuses.Completed ,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: 'React', status: TaskStatuses.New ,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', status: TaskStatuses.New ,order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: 'tea', status: TaskStatuses.New ,order: 0, addedDate: '', todoListId: 'todolistId2', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  })
})

test('correct task should be added', () => {

  const newTaskTitle = 'TS'

  const endState = tasksReducer(startState, addTaskAC('todolistId1',newTaskTitle))

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][0].id).toBeDefined()
  expect(endState['todolistId1'][0].title).toBe('TS')
  expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)

})



test('correct task should change its name', ()=>{
  const newTaskTitle = 'cookies';


  const endState = tasksReducer(startState, changeTasksTitleAC('todolistId2', '2', newTaskTitle))

  expect(endState['todolistId2'][0].title).toBe('bread')
  expect(endState['todolistId2'][1].title).toBe('cookies')
})



test('status of specified task should be changed', ()=>{

  const endState= tasksReducer(startState, changeTasksStatusAC('todolistId1', '2', TaskStatuses.New))

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})


test('new array should be added when new todolist is added', ()=>{
  const endState=tasksReducer(startState, addTodolistAC('new todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find(k=>k != 'todolistId1' && k!='todolistId2')
  if(!newKey)
    throw Error('new key should be added')
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {


  const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
