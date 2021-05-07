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

const Search = () => {
  return (
    <>
      <Row className="searchbar w-50 m-auto">
        <Form className="d-flex">
          <Form.Control
            className="me-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <Button variant="btn-outline-secondary" type="submit">
            Go
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default Search;
