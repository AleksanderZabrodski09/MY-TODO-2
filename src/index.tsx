import React from 'react';
import './index.css';
// import App from './App';


import { createRoot } from 'react-dom/client';
// import AppWithReducers from './AppWithReducers';
import AppWithRedux from './AppWithRedux';
import {store} from './state/store';
import {Provider} from 'react-redux';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

