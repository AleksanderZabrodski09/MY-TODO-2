import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {ChangeFilterType, TodolistsPropsType} from '../App'

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistsPropsType>

beforeEach(()=>{
  startState = [
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
  ]
})

test.skip('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].todolistId).toBe(todolistId2)
})
test.skip('correct todolist should be added', () => {

  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})
test.skip('correct todolist should change its name', () => {

  let newTodolistTitle = 'New Todolist'

  const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId1, newTodolistTitle))

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[1].title).toBe('What to buy')
})
test.skip('correct todolist should change its filter', ()=>{

  let newFilter: ChangeFilterType = 'completed'

  const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId1, newFilter))

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe('completed')
  expect(endState[1].filter).toBe('all')
})