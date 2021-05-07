import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import {
  faSquare,
  faTrashAlt,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const Todo = ({ todo, index, deleteTodo }) => {
  return (
    <>
      <Row className="todo-item py-3">
        <Row className="sidebar">
          <Col xl={1}>
            <FontAwesomeIcon
              role="checkbox"
              icon={faSquare}
              aria-label="Select Multiple"
              className="icon icon-big"
            />
          </Col>
          <Col xl={1} className="todo-text">
            <div>{todo}</div>
          </Col>
          <Col xl={1} className="individual-actions" id="hovered-actions">
            <FontAwesomeIcon
              role="checkbox"
              icon={faTrashAlt}
              aria-label="Delete Item"
              onClick={deleteTodo}
              className="icon icon-big"
            />
            <FontAwesomeIcon
              role="checkbox"
              icon={faCheckCircle}
              aria-label="Mark Completed"
              className="icon icon-big"
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
