import React, {useState} from 'react'
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import Todo from "./Todo"


const TodoForm = () => {
  const [todo, setTodo] = useState({})
  const [todos, setTodos] = useState([
    {todo: 'DO THIS'},
    {todo: 'DO THAT'},
    {todo: 'HIRE LUIS'},
  ])

  const handleOnchange = (e) => setTodo({[e.target.name]: e.target.value})

  const handleSubmit = (e) => setTodos([...todos, todo])

  return (
    <>
    <Form className="d-flex flex-row align-items-center">
      <Form.Control type="input" placeholder="Add a new To-Do" name="todo" className="border-0 w-100 todo-item new-todo-inputnombreField" />  
      <Button variant="primary" className="btn-add-todo btn-outline-secondary btn border-0 mt-2 new-todo-button" type="submit">  <i class="fas fa-plus-circle" />  </Button>
    </Form>
    {todos.map((val, idx) => <Todo index={idx} todo={val.todo} />  )} 
    
    </>
  )
}

export default TodoForm