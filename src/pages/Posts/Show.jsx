import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import { baseApiUrl } from "@/data/App";
import axios from "axios";
import Post from "../../components/UI/Post/Post";
import Header from "@/components/Common/Header";
import { Col, Container, Row } from "react-bootstrap";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import AlertBox from "../../components/Common/AlertBox";

export default function Show() {
  const [auth] = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { postId } = useParams();

  const postUrl =
    baseApiUrl +
    `/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;

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
        console.log(error);
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    <Container className="mb-5">
      <Row>
        <Col>
          <Header title={`${post.author.name}'s post "${post.title}"`}>
            {post.author.name}&apos;s post
          </Header>

          <Post post={post} className="mt-3" getPosts={getPost} />
        </Col>
      </Row>
    </Container>
  );
}
