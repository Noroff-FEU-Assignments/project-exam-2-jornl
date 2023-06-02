import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Common/Header";
import PostForm from "../../components/UI/Post/PostForm";

export default function Create() {
  return (
    <Container>
      <Row>
        <Col>
          <Header title="Create Post">Create Post</Header>
          <PostForm />
        </Col>
      </Row>
    </Container>
  );
}
