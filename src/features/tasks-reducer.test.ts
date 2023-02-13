import {TasksStateType} from '../trash/App';

import {
  addTaskAC,
  // changeTasksStatusAC,
  // changeTasksTitleAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer, updateTasksAC
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
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

  const task = {
    todoListId: 'todolistId1',
    id: '4',
    status: TaskStatuses.New,
    description: '',
    title: 'TS',
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    order: 1,
    addedDate: ''
  }

  const endState = tasksReducer(startState, addTaskAC(task))

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][0].id).toBeDefined()
  expect(endState['todolistId1'][0].title).toBe('TS')
  expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)

})



test('correct task should change its name', ()=>{
  const newTaskTitle = 'cookies';


  const endState = tasksReducer(startState, updateTasksAC('todolistId2', '2', {title:newTaskTitle}))

  expect(endState['todolistId2'][0].title).toBe('bread')
  expect(endState['todolistId2'][1].title).toBe('cookies')
})



test('status of specified task should be changed', ()=>{

  const endState= tasksReducer(startState, updateTasksAC('todolistId1', '2', {status:TaskStatuses.New}))

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})


test('new array should be added when new todolist is added', ()=>{
  const endState=tasksReducer(startState, addTodolistAC({
    id:'qewqwet',
    title: 'new todolist',
    order:0,
    addedDate:''
  }))

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

test('empty arrays should be added when we set todolists', ()=>{
  const action = setTodolistsAC([
    {id: '1', title: 'What to learn', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', addedDate: '', order: 0}
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])

})
test('tasks should be added for todolist', ()=>{
  const action = setTasksAC('todolistId1', startState['todolistId1'])

  const endState = tasksReducer({
    'todolistId1':[],
    'todolistId2':[]
  }, action)

  const keys = Object.keys(endState)


  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)

})