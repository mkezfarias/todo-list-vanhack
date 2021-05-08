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
import "./../App.scss";

const Todo = ({
  todo,
  selected,
  completed,
  index,
  deleteTodo,
  markCompleted,
  id,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [globalStatus, setGlobalStatus] = useState(false);

  const toggleStatus = (e, status) => {
    console.log("completed", completed, "selected", selected);
    if (status === "selected") {
      let selected = !isSelected;
      setIsSelected(selected);
      selected = !isSelected;
    } else if (status == "completed") {
      let statusCompleted = !isCompleted;
      setIsCompleted(statusCompleted);
      completed = !isCompleted;
    }
  };

  const toggleSelected = (e) => {
    let selected = !isSelected;
    let items = JSON.parse(window.localStorage.getItem("todos"));
    items[index].selected = !isSelected;
    window.localStorage.setItem("todos", items);
  };

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
                  icon={isSelected ? faSquareFull : faCheckSquare}
                  aria-label="Select Individual"
                  className="icon icon-big"
                />
              </a>
            </div>
          </Col>
          <Col xl={1} className="todo-text">
            <div>{todo}</div>
            <div>{id}</div>
            <div>{selected}</div>
            <div>{completed}</div>
          </Col>
          <Col xl={1} className="individual-actions " id="hovered-actions">
            <FontAwesomeIcon
              role="checkbox"
              icon={faTrashAlt}
              aria-label="Delete Item"
              onClick={() => deleteTodo(todo.id)}
              className="icon icon-big "
            />
            <FontAwesomeIcon
              role="checkbox"
              icon={faCheckCircle}
              onClick={(e) => toggleStatus(e, "completed")}
              aria-label="Mark Completed"
              className={isCompleted ? "icon icon-big" : "icon-big text-danger"}
            />
            <FontAwesomeIcon
              role="checkbox"
              icon={faClock}
              aria-label="Snooze"
              className="icon icon-big"
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Todo;
