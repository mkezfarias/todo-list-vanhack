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
      <Row className="searchbar w-50 m-auto ">
        <Form className="d-flex">
          <Form.Control
            className="me-2 search-input border-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Button variant="boutline-secondary" type="submit">
            Go
          </Button>
        </Form>
      </Row>
      <hr size="6" class="bg-warning" />
    </>
  );
};

export default Search;
