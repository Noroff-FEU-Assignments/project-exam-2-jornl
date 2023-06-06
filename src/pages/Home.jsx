import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Common/Header";
import { appName } from "../data/App";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="text-center" id="welcome-splash">
      <Row>
        <Col>
          <Header className="mt-5" title="Welcome!">
            Welcome to {appName}
          </Header>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12} md={6} className="mb-5 mb-md-0">
          <Link
            to="/login"
            className="btn btn-secondary py-3 px-4 fw-bold text-white"
          >
            Login to your account
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/register" className="btn btn-primary py-3 px-4 fw-bold">
            Create a new account
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
