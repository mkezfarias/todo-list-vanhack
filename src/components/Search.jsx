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
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";
import { queryByTitle } from "@testing-library/dom";
import queryBuilder from "./QueryBuilder";

const Search = (setTodos, setLastVisible) => {
  const [searchTerms, setSearchTerms] = useState("");

  const handleOnchange = (e) => setSearchTerms(e.target.value);
  const runSearch = (e) => {
    e.preventDefault();
    queryBuilder(searchTerms, setTodos, setLastVisible, null);
  };

  return (
    <>
      <Row className="searchbar w-50 m-auto ">
        <Form className="d-flex" onSubmit={runSearch}>
          <Form.Control
            className="me-2 search-input border-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleOnchange}
          />
          <Button
            variant="outline-secondary"
            className="border-0 "
            type="submit"
          >
            Go
          </Button>
        </Form>
      </Row>
      <hr size="6" className="bg-warning" />
    </>
  );
};

export default Search;
