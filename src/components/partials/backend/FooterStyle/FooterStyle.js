import React from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

const FooterStyle = () => {
  return (
    <>
      <footer className="mm-footer">
        <Container fluid>
          <Row>
            <Col lg="6">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/terms-of-service">Terms of Use</Link>
                </li>
              </ul>
            </Col>
            <Col lg="6" className="text-right">
              <span className="mr-1">
                Copyright<span>2025</span>© <Link to="/">Abay Bank</Link>
                All Rights Reserved.
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default FooterStyle;
