import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm'

const  App = () => {

  return (
    <div className="App">
      <div className="App-content">
        <TodoForm />
      </div>
    </div>
  );
}

export default App;