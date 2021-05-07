import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const TodoForm = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([
    { content: "DO THIS", selected: false },
    { content: "DO THAT", selected: false },
    { content: "HIRE LUIS", selected: false },
  ]);

  useEffect(() => {
    const checkTodos = () => {
      const allTodos = JSON.parse(localStorage.getItem("todos"));
      if (allTodos) {
        setTodos(allTodos);
        console.log(allTodos);
      }
    };
    window.addEventListener("storage", checkTodos);

    return () => {
      window.removeEventListener("storage", checkTodos);
    };
  }, []);

  const handleOnchange = (e) =>
    setTodo({ [e.target.name]: e.target.value, selected: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(todo).length === 0 || todo.content.trim() === "") return;
    setTodos([...todos, todo]);
    console.log(todo);
    localStorage.setItem("todos", [...todos, todo]);
    console.log([...todos, todo]);
  };

  const deleteTodo = (idx) => {
    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <Container>
        <Col className="list-of-todos main-container">
          {todos.map((item, idx) => (
            <Todo
              todo={item.content}
              selected={item.selected}
              key={idx}
              index={idx}
              deleteTodo={deleteTodo}
            />
          ))}
        </Col>
        <Form
          className="d-flex flex-row align-items-center"
          onSubmit={handleSubmit}
        >
          <Form.Control
            type="input"
            placeholder="Add a new To-Do"
            name="content"
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
      </Container>
    </>
  );
};

export default TodoForm;
