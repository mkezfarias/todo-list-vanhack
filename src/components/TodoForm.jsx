import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore, firebase } from "../firebase";

import "./../App.scss";

const TodoForm = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([
    { content: "DO THIS", selected: false },
    { content: "DO THAT", selected: false },
    { content: "HIRE LUIS", selected: false },
  ]);

  useEffect(() => {
    let unsubscribeFromReportes = null;

    (async function fetchReportes() {
      unsubscribeFromReportes = await firestore
        .collection("todos")
        .limit(10)
        .onSnapshot((snapshot) => {
          let todosList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosList);
        });
    })();
  }, []);

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodo({
      [name]: value,
      selected: false,
      completed: false,
      created_at: Date.now(),
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(todo).length === 0 || todo.content.trim() === "") return;

    await firestore.collection("todos").add(todo);
    e.target.firstElementChild.value = "";
  }

  const deleteTodo = async (id) => {
    const todoToDelete = await firestore.collection("todos").doc(id).delete();
  };

  const markCompleted = async (id) => {
    const todoToDelete = await firestore
      .collection("todos")
      .doc(id)
      .update({ completed: true });
  };

  return (
    <>
      <Container>
        <Col className="list-of-todos main-container">
          {todos.map((item, idx) => (
            <Todo
              todo={item.content}
              markCompleted={() => markCompleted(idx)}
              selected={item.selected}
              key={idx}
              index={idx}
              deleteTodo={() => deleteTodo(item.id)}
              completed={item.completed}
              id={item.id}
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
