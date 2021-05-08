import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Navbar,
  ListGroup,
  Form,
} from "react-bootstrap";
import {
  faSquare,
  faCaretDown,
  faTrash,
  faCheckCircle,
  faClock,
  faCaretLeft,
  faCaretRight,
  faCheckSquare,
  faSquareFull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";
import { firestore, firebase } from "../firebase";
import wait from "waait";

export default function Title(props) {
  const [allSelected, setAllSelected] = useState(false);
  const [iconSelected, setIconSelected] = useState(faSquareFull);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribeFromTodos = null;
    (async function fetchTodos() {
      unsubscribeFromTodos = await firestore
        .collection("todos")
        .onSnapshot((snapshot) => {
          let todosList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosList);
        });
    })();
    return () => unsubscribeFromTodos();
  }, [allSelected]);

  async function toggleAll() {
    setAllSelected(!allSelected);
    todos.forEach((todo) => {
      wait(200);
      firestore
        .collection("todos")
        .doc(todo.id)
        .update({ selected: !allSelected });
    });
  }

  function deleteSelected() {
    let selectedTodos = todos.filter((todo) => todo.selected);
    selectedTodos.forEach((todo) => {
      const todoToDelete = firestore.collection("todos").doc(todo.id).delete();
    });
  }

  function completeSelected() {
    let selectedTodos = todos.filter((todo) => todo.selected);
    selectedTodos.forEach((todo) => {
      const todoToComplete = firestore
        .collection("todos")
        .doc(todo.id)
        .update({ completed: true });
    });
  }
  return (
    <>
      <header className="text-center my-3">
        <Container>
          <Row className="bg-warning rounded-top box-shadow py-2">
            <Col xl={1} role="checkbox" className=" select-all pt-2">
              <Row>
                <Col xl={1}>
                  <div
                    onClick={toggleAll}
                    className="selectBox"
                    id="iconContainer"
                  >
                    <a id="clicker" href="#link">
                      <FontAwesomeIcon
                        role="checkbox"
                        icon={allSelected ? faCheckSquare : faSquare}
                        aria-label="Select Multiple"
                        className="icon-big text-light"
                      />
                    </a>
                  </div>
                </Col>
                <Col xl={1}>
                  <div>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      aria-label="Select Multiple"
                      className="icon-big"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl={3} className=" multiple-actions row py-2">
              <Row>
                <Col xl={3}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    aria-label="Complete Selected"
                    className="icon-big"
                  />
                </Col>
                <Col xl={3}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    aria-label="Delete Selected"
                    className="icon-big"
                    onClick={deleteSelected}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={4} className=" py-2">
              |
            </Col>
            <Col xl={4} className=" pagination-control py-2 text-right ">
              <Row>
                <Col xl={2}>
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    aria-label="Previous Page"
                    className="icon-big controls"
                  />
                </Col>
                <Col xl={5}>1-10 of 444 </Col>

                <Col xl={2}>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    aria-label="Next Page"
                    className="icon-big controls"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
}
