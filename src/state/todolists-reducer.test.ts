import { todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistsPropsType } from '../App'

test('correct todolist should be removed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const startState: Array<TodolistsPropsType> = [
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
  ]

  const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', todolistId: todolistId1})

  expect(endState.length).toBe(1)
  expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: TodolistsPropsType[] = [
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
  ]

  const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct title todolist should be changed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: TodolistsPropsType[] = [
    {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
  ]

  const endState = todolistsReducer(startState, {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId1, title: newTodolistTitle})

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTodolistTitle)
  expect(endState[1].title).toBe('What to buy')
})
