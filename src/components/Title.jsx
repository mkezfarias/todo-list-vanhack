import React, { useState } from "react";
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
import wait from "waait";

export default function Title(props) {
  const [allSelected, setAllSelected] = useState(false);
  const [iconSelected, setIconSelected] = useState(faSquareFull);

  const updateIcons = (e) => {
    let squares = document.querySelectorAll(".individualSelected");
    console.log(squares);
    squares.forEach((square) => {
      square.firstElementChild.classList.toggle("text-warning");
      square.firstElementChild.classList.toggle("selectedSquare");
    });
  };

  const selectAll = (e) => {
    let status = !allSelected;
    setAllSelected(status);
    let icon = status ? faCheckSquare : faSquareFull;
    setIconSelected(icon);
    wait(400);
    updateIcons();
  };

  return (
    <>
      <header className="text-center my-3">
        <h1 className="fs-5 text-black-50">
          {props.name}
          {props.name[props.name.length - 1] === "S" ? "'" : "'S"} TO DO LIST
        </h1>
        <Container>
          <Row className="bg-warning rounded-top box-shadow py-2">
            <Col xl={1} role="checkbox" className=" select-all pt-2">
              <Row>
                <Col xl={1}>
                  <div
                    onClick={selectAll}
                    className="selectBox"
                    id="iconContainer"
                  >
                    <a id="clicker" href="#link">
                      <FontAwesomeIcon
                        role="checkbox"
                        icon={iconSelected}
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
                    icon={faTrash}
                    aria-label="Delete Selected"
                    className="icon-big"
                  />
                </Col>
                <Col xl={3}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    aria-label="Complete Selected"
                    className="icon-big"
                  />
                </Col>
                <Col xl={3}>
                  <FontAwesomeIcon
                    icon={faClock}
                    aria-label="Snooze Selected"
                    className="icon-big"
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
