import React from 'react';
import './App.scss';
import TodoForm from './components/TodoForm'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from './components/Nav.jsx';
import Search from './components/Search.jsx';
import Title from './components/Title';


const  App = () => {

  return (
    <div className="App">
      <div className="App-content">
        <Nav />
        <TodoForm />  
      </div>
    </div>
  );
}

export default App;