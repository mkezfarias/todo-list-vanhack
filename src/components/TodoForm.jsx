import React, { useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const TodoForm = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([
    { todo: "DO THIS" },
    { todo: "DO THAT" },
    { todo: "HIRE LUIS" },
  ]);

  const handleOnchange = (e) => setTodo({ [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(todo).length === 0 || todo.todo.trim() === "") return;
    setTodos([...todos, todo]);
  };

  const deleteTodo = (idx) => {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <Col className="list-of-todos">
        {todos.map((val, idx) => (
          <Todo todo={val.todo} key={idx} index={idx} deleteTodo={deleteTodo} />
        ))}
      </Col>
      <Form
        className="d-flex flex-row align-items-center"
        onSubmit={handleSubmit}
      >
        <Form.Control
          type="input"
          placeholder="Add a new To-Do"
          name="todo"
          className="border-0 w-100 todo-item new-todo-inputnombreField"
          onChange={handleOnchange}
        />
        <Button
          variant="btn-outline-light"
          className="btn-add-todo  btn border-0 mt-2 new-todo-button"
          type="submit"
        >
          {" "}
          <FontAwesomeIcon icon={faPlusCircle} />{" "}
        </Button>
      </Form>
    </>
  );
};

export default TodoForm;
