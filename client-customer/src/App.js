import "./App.css";
import React, { Component } from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import MyProvider from "./contexts/MyProvider";
import { DarkModeProvider } from "./components/DarkModeContext";


class App extends Component {
  render() {
    return (
      <DarkModeProvider>
        <MyProvider>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </MyProvider>
      </DarkModeProvider>
    );
  }
}
export default App;
