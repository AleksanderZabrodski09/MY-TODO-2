import {TaskPropsType} from '../App';
import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';


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
// test('correct todolist should change its name', () => {

  // let newTodolistTitle = 'New Todolist'
  //
  // const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId1, newTodolistTitle))
  //
  // expect(endState.length).toBe(2)
  // expect(endState[0].title).toBe(newTodolistTitle)
  // expect(endState[1].title).toBe('What to buy')
// })

// test('correct todolist should change its filter', ()=>{

  // let newFilter: ChangeFilterType = 'completed'
  //
  // const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId1, newFilter))
  //
  // expect(endState.length).toBe(2)
  // expect(endState[0].filter).toBe('completed')
  // expect(endState[1].filter).toBe('all')
// })