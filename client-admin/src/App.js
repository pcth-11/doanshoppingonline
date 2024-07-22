import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Login />
        <BrowserRouter>
        <Main />
        <ToastContainer />
      </BrowserRouter>
      </MyProvider>
    );
  }
}
export default App;