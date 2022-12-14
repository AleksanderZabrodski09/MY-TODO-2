import {TaskPropsType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {AddTodolistAC, RemoveTodolistAC} from './todolists-reducer';


let startState: TaskPropsType
beforeEach(()=>{
  startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }})
test('correct task should be removed', () => {

  const endState =tasksReducer(startState, removeTaskAC('todolistId2', '2'))

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'][1].title).toBe('tea')
})

test('correct task should be added', () => {

  let newTaskTitle = 'TS'

  const endState = tasksReducer(startState, addTaskAC('todolistId1',newTaskTitle))

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][0].title).toBe('TS')
})
test('correct task should change its name', () => {

  const endState = tasksReducer(startState, changeTaskTitleAC('todolistId2', '3', 'coffee'))

  expect(endState['todolistId1'][2].title).toBe('React')
  expect(endState['todolistId2'][2].title).toBe('coffee')

})

test('status of specified task should be changed', ()=>{

  const endState=tasksReducer(startState, changeTaskStatusAC('todolistId1', '1', true))

  expect(endState['todolistId1'][0].isDone).toBe(true)
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('new array should be added when todolist is added', ()=>{

  const endState=tasksReducer(startState, AddTodolistAC('new todolist'))

  const keys=Object.keys(endState)
  const newKey=keys.find(k=> k!='todolistId1' &&  k!='todolistId2')
  if(!newKey)
    throw Error('new key should be added')

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolist deleted',()=>{
  const endState=tasksReducer(startState, RemoveTodolistAC('todolistId2'))


  const keys=Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})