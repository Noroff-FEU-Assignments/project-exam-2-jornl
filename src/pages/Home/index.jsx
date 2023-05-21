import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Common/Header";
import PostList from "./PostList";

export default function index() {
  return (
    <Container>
      <Row>
        <Col>
          <Header title="Latest Posts" className="py-3">
            Latest posts
          </Header>

          <PostList />
        </Col>
      </Row>
    </Container>
  );
}
