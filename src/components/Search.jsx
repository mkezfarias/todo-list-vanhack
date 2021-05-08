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
import { firestore, firebase } from "../firebase";

const Search = (props) => {
  const [searchTerms, setSearchTerms] = useState("");

  const handleOnchange = (e) => setSearchTerms(e.target.value);

  const searchByKeyword = (val) => {
    if (!val) return;

    let todosRef = firestore
      .collection("todos")
      .where("searchArray", "array-contains", val)
      .orderBy("created_at", "desc")
      .onSnapshot((snapshot) => {
        let todosList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        props.callback(todosList);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchByKeyword(searchTerms);
  };

  return (
    <>
      <Row className="searchbar w-md-50 m-auto ">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            className="me-2 search-input border-0 my-4 mt-md-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleOnchange}
          />
          <Button
            variant="outline-secondary"
            className="border-0"
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
