import React, { useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import {
  faPlusCircle,
  faSquare,
  faTrash,
  faClock,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
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
      <Container>
        <div className="sidebar d-flex bg-warning row rounded-top top-row">
          <div role="checkbox" className="select-all col-2 pt-2">
            <FontAwesomeIcon
              icon={faSquare}
              className="icon-big select-all-checkbox"
            />{" "}
            <FontAwesomeIcon icon={faCaretDown} className="icon-big" />{" "}
          </div>
          <div className="multiple-actions col-2 row py-2">
            <i
              aria-label="Delete Selected"
              className="fas fa-trash-alt col-4 py-1"
            ></i>
            <i
              aria-label="Complete Selected"
              className="fas fa-check-circle col-4 py-1"
            ></i>
            <i
              aria-label="Snooze Selected"
              className="fas fa-clock col-4 py-1"
            ></i>
          </div>
          <span className="col-1 py-2">|</span>
          <div className="pagination-control col-5 offset-2 row py-2">
            <span className="col-3">1-10 of 444 </span>
            <i
              aria-label="Previous page"
              className="fas fa-caret-left col-1 pt-1 controls"
            ></i>
            <i
              aria-label="Next page"
              className="fas fa-caret-right col-1 pt-1 controls"
            ></i>
          </div>
        </div>
        <Col classNameName="list-of-todos main-container">
          {todos.map((item, idx) => (
            <Todo
              todo={item.todo}
              key={idx}
              index={idx}
              deleteTodo={deleteTodo}
            />
          ))}
        </Col>
        <Form
          classNameName="d-flex flex-row align-items-center"
          onSubmit={handleSubmit}
        >
          <Form.Control
            type="input"
            placeholder="Add a new To-Do"
            name="todo"
            classNameName="border-0 w-100 todo-item new-todo-inputnombreField"
            onChange={handleOnchange}
          />
          <Button
            variant="btn-outline-light"
            classNameName="btn-add-todo  btn border-0 mt-2 new-todo-button"
            type="submit"
          >
            {" "}
            <FontAwesomeIcon icon={faPlusCircle} />{" "}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default TodoForm;
