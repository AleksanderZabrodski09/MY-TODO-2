import {useEffect, useState} from 'react';
import axios from 'axios';
//
export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }

}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        setState(res.data)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null)
  let title = 'VUE'
  useEffect(() => {
    axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
      .then((res) => {
        setState(res.data)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let title = 'new title'
    let todolistId = '7edc1831-438c-4864-a4c4-4b72a4f32c14';
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title}, settings)
      .then((res)=>{
        setState(res.data)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = 'b1235642-43c5-4b39-844c-248741036d90';
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then((res) => {
        setState(res.data)
      })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
