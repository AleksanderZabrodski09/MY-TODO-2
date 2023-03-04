import React from 'react';
import './App.css';
import ButtonAppBar from './AppBar';
import {Container} from '@mui/material';
import {TodolistsList} from '../features/Todolists/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login';


function AppWithRedux() {

  return (
    <div className="App">
      <ErrorSnackbar/>
      <ButtonAppBar/>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList/>}/>
          <Route path={'/login'} element={<Login/>}/>

          <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>} />
          <Route path={'*'} element={<Navigate to={'/404'} />} />

        </Routes>
      </Container>
    </div>
  );
}

export default AppWithRedux;



