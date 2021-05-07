import React from 'react';
import './App.scss';
import TodoForm from './components/TodoForm'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from './components/Nav.jsx';
import Search from './components/Search.jsx';
import Title from './components/Title';


const  App = () => {

  const name = "sustainalytics"
  return (
    <div className="App">
      <div className="App-content">
        <Nav />
        <Search />
        <Title name={name.toUpperCase()}/>
        <TodoForm />
        
      </div>
    </div>
  );
}

export default App;