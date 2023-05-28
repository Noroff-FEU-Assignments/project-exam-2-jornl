import { Col, Container, Row } from "react-bootstrap";
import Header from "@/components/Common/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseApiUrl } from "@/config/App";
import AuthContext from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import PostList from "@/components/UI/PostList";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auth] = useContext(AuthContext);

  const postsUrl =
    baseApiUrl + "/social/posts?_author=true&_comments=true&_reactions=true";

  useEffect(() => {
    axios
      .get(postsUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postsUrl, auth.accessToken]);

  if (isLoading) {
    return <LoadingIndicator variant="secondary" />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header title="Latest Posts" className="py-3">
            Latest posts
          </Header>

          <PostList posts={posts} />
        </Col>
      </Row>
    </Container>
  );
}
