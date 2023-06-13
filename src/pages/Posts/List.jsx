import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Common/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseApiUrl } from "@/data/App";
import AuthContext from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import PostList from "@/components/UI/Post/PostList";
import AlertBox from "@/components/Common/AlertBox";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  const postsUrl =
    baseApiUrl +
    "/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc";

  function getPosts() {
    axios
      .get(postsUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPosts();
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
          <Header
            title="Latest Posts"
            className="py-3 d-flex justify-content-between align-items-center"
          >
            Latest posts
            <Link className="btn btn-primary fw-bold" to="/posts/create">
              <FontAwesomeIcon icon={faPlus} /> Post
            </Link>
          </Header>

          <PostList posts={posts} getPosts={getPosts} />
        </Col>
      </Row>
    </Container>
  );
}
