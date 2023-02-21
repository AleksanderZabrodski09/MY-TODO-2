import React from 'react';
import './App.css';
import ButtonAppBar from './AppBar';
import {Container} from '@mui/material';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/Todolists/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';



function AppWithRedux() {

  return (
    <div className="App">
      <ErrorSnackbar/>
      <ButtonAppBar/>
      <Container>
        <TodolistsList/>
      </Container>
    </div>
  );
}

export default AppWithRedux;



