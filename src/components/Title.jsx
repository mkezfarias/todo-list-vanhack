import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Navbar,
  ListGroup,
  Form,
} from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const Title = (props) => {
  return (
    <>
      <header class="text-center my-3">
        <h1 class="fs-5 text-black-50">
          {props.name}
          {props.name[props.name.length - 1] === "S" ? "'" : "'S"} TO DO LIST
        </h1>
      </header>
    </>
  );
};

export default Title;
