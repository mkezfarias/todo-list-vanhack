import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import {
  faSquare,
  faTrashAlt,
  faCheckCircle,
  faClock,
  faSquareFull,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore, firebase } from "../firebase";

import "./../App.scss";

const Todo = ({
  todo,
  selected,
  completed,
  index,
  deleteTodo,
  markCompleted,
  id,
  toggleSelected,
  toggleCompleted,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [globalStatus, setGlobalStatus] = useState(false);

  useEffect(() => {
    function updateStatus() {
      let status = JSON.parse(window.localStorage.getItem("todos"));
      setIsSelected(status[index].selected);
      console.log(status[index].selected);
    }

    window.addEventListener("storage", updateStatus);

    return () => {
      window.removeEventListener("storage", updateStatus);
    };
  }, [isSelected]);

  return (
    <>
      <Row className="todo-item py-3">
        <Row className="sidebar">
          <Col xl={1} className="individualSelected">
            <div
              onClick={toggleSelected}
              className="selectBox"
              id="iconContainer"
            >
              <a className="clicker" id="clicker" href="#link">
                <FontAwesomeIcon
                  role="checkbox"
                  icon={selected ? faCheckSquare : faSquareFull}
                  aria-label="Select Individual"
                  className="icon icon-big"
                />
              </a>
            </div>
          </Col>
          <Col xl={9} className="todo-text py-1">
            <div>{todo}</div>
          </Col>
          <Col xl={1} className="individual-actions " id="hovered-actions">
            <FontAwesomeIcon
              role="checkbox"
              icon={faCheckCircle}
              onClick={toggleCompleted}
              aria-label="Mark Completed"
              className={completed ? "icon-big text-warning" : "icon icon-big"}
            />
            <FontAwesomeIcon
              role="checkbox"
              icon={faTrashAlt}
              aria-label="Delete Item"
              onClick={() => deleteTodo(todo.id)}
              className="icon icon-big "
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Todo;
