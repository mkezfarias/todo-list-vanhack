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
import {
  faSquare,
  faCaretDown,
  faTrash,
  faCheckCircle,
  faClock,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../App.scss";

const Title = (props) => {
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
                  <FontAwesomeIcon
                    role="checkbox"
                    icon={faSquare}
                    aria-label="Select Multiple"
                    className="icon-big"
                  />
                </Col>
                <Col xl={1}>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    aria-label="Select Multiple"
                    className="icon-big"
                  />
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
};

export default Title;
