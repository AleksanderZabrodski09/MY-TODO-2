import {ChangeFilterType,  TodolistType} from '../App';
import {v1} from 'uuid';




const todolistId1 = v1()
const todolistId2 = v1()
let startState: TodolistType[]

// beforeEach(() => {
//     startState = [
//       {todolistId: todolistId1, title: 'What to learn', filter: 'all'},
//       {todolistId: todolistId2, title: 'What to buy', filter: 'all'}
//     ]
//   }
// )

// test('correct todolist should be added', () => {
//
//   const newTodolistTitle = 'New Todolist'
//
//   const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
//
//   expect(endState.length).toBe(3)
//   expect(endState[0].title).toBe('New Todolist')
//
// })

// test('correct todolist should be removed', () => {
//
//   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
//
//   expect(endState.length).toBe(1)
//   expect(endState[0].title).toBe('What to buy')
// })
//
// test('correct todolist should change its name', ()=>{
//   const newTodolistTitle = 'New Todolist';
//
//   const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
//
//   expect(endState[0].title).toBe('What to learn')
//   expect(endState[1].title).toBe('New Todolist')
// })
// test('correct todolist should change its name', ()=>{
//   const newFilter: ChangeFilterType = 'completed';
//
//   const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
//
//   expect(endState[0].filter).toBe('all')
//   expect(endState[1].filter).toBe('completed')
// })
