import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Todo from "./Todo";
import {
  faNetworkWired,
  faPlusCircle,
  faSadCry,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore, firebase } from "../firebase";
import "./../App.scss";
import Title from "./Title";
import Search from "./Search";

const TodoForm = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [lastVisible, setLastVisible] = useState(0);
  const [firstVisible, setFirstVisible] = useState(0);
  const [val, setVal] = useState("");
  useEffect(() => {
    let unsubscribeFromTodos = null;

    (async function fetchTodos() {
      unsubscribeFromTodos = await firestore
        .collection("todos")
        .orderBy("created_at", "desc")
        .limit(10)
        .onSnapshot((snapshot) => {
          let todosList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosList);
          setLastVisible(
            todosList.length > 0 && todosList[todosList.length - 1].created_at
          );
          setFirstVisible(todosList.length > 0 && todosList[0].created_at);
          console.log(firstVisible);
        });
    })();
  }, []);

  const nextPage = () => {
    if (todos.length < 10) return;
    let unsubscribeFromTodos = null;

    (async function fetchTodos() {
      unsubscribeFromTodos = await firestore
        .collection("todos")
        .orderBy("created_at", "desc")
        .limit(10)
        .startAfter(lastVisible)
        .onSnapshot((snapshot) => {
          let todosList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (todosList.length <= 1) {
            return;
          } else {
            setTodos(todosList);
            setLastVisible(todosList[todosList.length - 1].created_at);
            setFirstVisible(todosList[0].created_at);
            console.log(firstVisible);
          }
        });
    })();
  };

  const prevPage = () => {
    let unsubscribeFromTodos = null;

    (async function fetchTodos() {
      unsubscribeFromTodos = await firestore
        .collection("todos")
        .orderBy("created_at", "desc")
        .limit(10)
        .endBefore(firstVisible)
        .onSnapshot((snapshot) => {
          let todosList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (todosList.length <= 1) {
            return;
          } else {
            setTodos(todosList);
            setLastVisible(todosList[todosList.length - 1].created_at);
            setFirstVisible(todosList[0].created_at);
            console.log(firstVisible);
          }
        });
    })();
  };
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
    let toggled = await firestore
      .collection("todos")
      .doc(id)
      .update({ completed: !status });
  };

  const name = "sustainalytics";
  return (
    <>
      <Search callback={setTodos} />

      <h1 className="fs-3 text-black-50 m-auto text-center py-4 py-md-3">
        {name.toUpperCase()}
        {name[name.length - 1] === "S" ? "'" : "'S"} TO DO LIST
      </h1>
      <Container>
        <Row>
          <Col xl={10} md={9} xs={10}>
            <Form
              className="d-flex flex-row align-items-center"
              onSubmit={handleSubmit}
            >
              <Form.Control
                type="input"
                placeholder="Add a new To-Do"
                name="content"
                className="border-0 w-75 todo-item new-todo-inputnombreField"
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
          </Col>
          <Col xl={2} md={3} xs={2} className="text-end py-md-2 py-3">
            <Row>
              <Col xl={6} md={5} xs={4}>
                <FontAwesomeIcon
                  icon={faCaretLeft}
                  aria-label="Previous Page"
                  className="icon-big controls"
                  onClick={prevPage}
                />
              </Col>

              <Col xl={6} md={5} xs={4}>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  aria-label="Next Page"
                  className="icon-big controls"
                  onClick={nextPage}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Title name={name.toUpperCase()} />

      <Container>
        <Col className="list-of-todos main-container">
          {todos.map((item, idx) => (
            <Todo
              todo={item.content}
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
