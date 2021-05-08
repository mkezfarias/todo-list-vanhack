import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore, firebase } from "../firebase";

import "./../App.scss";
import Title from "./Title";
import Search from "./Search";

const TodoForm = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);

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
      searchArray: value.split(" "),
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

  const toggleSelected = async (id) => {
    let status = null;
    await firestore
      .collection("todos")
      .doc(id)
      .get()
      .then((resp) => (status = resp.data().selected));
    console.log("item", status);
    let toggled = await firestore
      .collection("todos")
      .doc(id)
      .update({ selected: !status });
  };

  const toggleCompleted = async (id) => {
    let status = null;
    await firestore
      .collection("todos")
      .doc(id)
      .get()
      .then((resp) => (status = resp.data().completed));
    console.log("item", status);
    let toggled = await firestore
      .collection("todos")
      .doc(id)
      .update({ completed: !status });
  };

  const name = "sustainalytics";
  return (
    <>
      <Search setTodos={setTodos} setLastVisible={setLastVisible} />

      <h1 className="fs-5 text-black-50 m-auto text-center">
        {name.toUpperCase()}
        {name[name.length - 1] === "S" ? "'" : "'S"} TO DO LIST
      </h1>
      <Container>
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
      <Title name={name.toUpperCase()} />

      <Container>
        <Col className="list-of-todos main-container">
          {todos.map((item, idx) => (
            <Todo
              todo={item.content}
              //markCompleted={() => markCompleted(item.id)}
              selected={item.selected}
              key={idx}
              index={idx}
              deleteTodo={() => deleteTodo(item.id)}
              completed={item.completed}
              id={item.id}
              toggleSelected={() => toggleSelected(item.id)}
              toggleCompleted={() => toggleCompleted(item.id)}
            />
          ))}
        </Col>
      </Container>
    </>
  );
};

export default TodoForm;
