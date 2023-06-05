import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApiUrl } from "@/data//App";
import AuthContext from "../../contexts/AuthContext";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import { Col, Container, Row } from "react-bootstrap";
import AlertBox from "../../components/Common/AlertBox";
import PostForm from "../../components/UI/Post/PostForm";
import Header from "../../components/Common/Header";

export default function Edit() {
  const [auth] = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();
  const postUrl = `${baseApiUrl}/social/posts/${postId}?_author=true`;

  function getPost() {
    axios
      .get(postUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getPost();
  }, []);

  if (isLoading) {
    return <LoadingIndicator variant="secondary" />;
  }

  if (error) {
    return (
      <Container>
        <AlertBox level="danger" message={error} />
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header title="Edit Post">Edit Post</Header>
          <PostForm post={post} />
        </Col>
      </Row>
    </Container>
  );
}
