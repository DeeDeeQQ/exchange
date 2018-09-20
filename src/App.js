import React, { Component } from "react";
import "./App.css";
import Exchange from "./components/Table";
import RegisterForm from "./components/Form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RegisterForm />
        </header>
        <Exchange />
      </div>
    );
  }
}

export default App;
