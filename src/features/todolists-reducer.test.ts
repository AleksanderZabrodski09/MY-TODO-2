import {v1} from 'uuid';
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC, setTodolistsAC,

  TodolistDomainType,
  todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../api/todolist-api';


const todolistId1 = v1()
const todolistId2 = v1()
let startState: TodolistDomainType[]

beforeEach(() => {
    startState = [
      {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: '', order: 0,entityStatus:'idle'},
      {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: '', order: 0,entityStatus:'idle'}
    ]
  }
)

test('correct todolist should be added', () => {

  // const newTodolistTitle = 'New Todolist'
  let todolist:TodolistType = {
    id: 'qewqwet',
    title: 'New Todolist',
    order: 0,
    addedDate: ''
  }
  const endState = todolistsReducer(startState, addTodolistAC(todolist))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('New Todolist')

})

test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe('What to buy')
})

test('correct todolist should change its name', ()=>{
  const newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe('New Todolist')
})
test('todolist should be set to state', ()=>{

  const endState = todolistsReducer([], setTodolistsAC(startState))

  expect(endState.length).toBe(2)

})
