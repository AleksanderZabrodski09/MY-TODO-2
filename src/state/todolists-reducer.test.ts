import {TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';


test('correct todolist should be added', ()=>{
  const todolistId1=v1()
  const todolistId2=v1()

  let startState:TodolistType[] = [
    {todolistId:todolistId1, title:'What to learn', filter:'all'},
    {todolistId:todolistId2, title:'What to buy', filter:'all'}
  ]

  const newTodolistTitle = 'New Todolist'

  const endState= todolistsReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('New Todolist')


})