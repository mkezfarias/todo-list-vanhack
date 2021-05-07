import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Navbar,
  ListGroup,
} from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const Nav = () => {
  return (
    <Navbar
      bg="light"
      className="navbar navbar-expand-lg navbar-light bg-light my-0 w-100"
    >
      <Container fluid className="d-flex justify-content-between">
        <Col xl={8} offset={1} className="navbar-brand mx-5">
          <FontAwesomeIcon icon={faCheckCircle} className="icon icon-big" />
          <span className="logo-text ">LET'S DO IT</span>
        </Col>
        <Col xl={2}>
          <a className="nav-link active text-gray" aria-current="page" href="#">
            Change User
          </a>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Nav;
