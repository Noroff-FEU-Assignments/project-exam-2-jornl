import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { baseApiUrl } from "../../config/App";
import AuthContext from "../../contexts/AuthContext";
import { Card, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultUser from "@/assets/circle-user-regular.svg";
import { formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

export default function PostList() {
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
    <div className="d-flex flex-column gap-5">
      {posts.map((post) => {
        const avatar =
          post.author.avatar === "" || post.author.avatar === null
            ? defaultUser
            : post.author.avatar;

        return (
          <Card key={post.id} className="shadow border-0">
            <Card.Body className="px-4">
              <div className="card__header d-flex">
                <Image
                  fluid
                  className="rounded-full h-12 me-2 me-md-4 mb-2 mb-md-4"
                  src={avatar}
                />
                <div className="user__info">
                  <Link className="underline">{post.author.name}</Link>
                  <p className="text-muted">
                    <span className="me-4">
                      {formatDistance(new Date(post.created), new Date(), {
                        addSuffix: true,
                      })}
                    </span>

                    <span className="me-4">
                      <FontAwesomeIcon icon={faThumbsUp} />{" "}
                      {post._count.reactions}
                    </span>
                    <span className="me-4">
                      <FontAwesomeIcon icon={faComment} />{" "}
                      {post._count.comments}
                    </span>
                  </p>
                </div>
              </div>

              <p className="mb-0">
                <Link className="fw-semibold">{post.title}</Link>
              </p>
              <p className="border-bottom pb-3">{post.body}</p>

              <div className="post__comments mt-3">
                {post.comments.map((comment) => {
                  const commentAvatar =
                    comment.author.avatar === "" ||
                    comment.author.avatar === null
                      ? defaultUser
                      : comment.author.avatar;

                  return (
                    <div key={comment.id} className="comment mb-2">
                      <div className="comment__userinfo d-flex">
                        <Image
                          fluid
                          className="rounded-full h-10 me-3 mb-2"
                          src={commentAvatar}
                        />

                        <Link className="underline">{comment.author.name}</Link>
                      </div>

                      <p>{comment.body}</p>
                    </div>
                  );
                })}
              </div>

              <Form className="mt-4">
                <Form.Control placeholder="Write a comment" />
              </Form>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
