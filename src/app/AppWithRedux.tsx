import React from 'react';
import './App.css';
import ButtonAppBar from './AppBar';
import {Container} from '@mui/material';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/Todolists/TodolistsList';



function AppWithRedux() {

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container>
        <TodolistsList/>
      </Container>
    </div>
  );
}

export default AppWithRedux;



