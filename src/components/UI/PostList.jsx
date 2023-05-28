import { Card, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import Avatar from "@/components/Common/Avatar";
import Comment from "@/components/UI/Comment";
import PropTypes from "prop-types";

export default function PostList({ posts, avatar = "" }) {
  let userAvatar;
  let userName;

  return (
    <div className="d-flex flex-column gap-5">
      {posts.map((post) => {
        if (post.author === undefined) {
          userAvatar = avatar;
          userName = post.owner;
        }
        return (
          <Card key={post.id} className="shadow border-0">
            <Card.Body className="px-4">
              <div className="card__header d-flex">
                <Avatar
                  avatar={userAvatar ?? post.author.avatar}
                  className="h-12 me-2 me-md-3 mb-2 mb-md-3"
                />
                <div className="flex-grow-1">
                  <Link className="underline">
                    {userName ?? post.author.name}
                  </Link>
                  <p className="text-muted d-flex d-md-block justify-content-between">
                    <span className="me-md-4">
                      {formatDistance(new Date(post.created), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                    {!post._count ? (
                      <></>
                    ) : (
                      <>
                        <span className="me-md-4">
                          <FontAwesomeIcon icon={faThumbsUp} />{" "}
                          {post._count.reactions}
                        </span>
                        <span className="me-md-4">
                          <FontAwesomeIcon icon={faComment} />{" "}
                          {post._count.comments}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <p className="mb-0">
                <Link className="fw-semibold">{post.title}</Link>
              </p>
              {post.media && (
                <Image src={post.media} fluid className="my-2 rounded" />
              )}
              <p className="border-bottom pb-3">{post.body}</p>

              <div className="post__comments mt-3">
                {/* TODO: Only display 2-3 comments and have a View More button. */}

                {post.comments &&
                  post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
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

PostList.defaultProps = {
  avatar: "",
};

PostList.propTypes = {
  posts: PropTypes.array,
  avatar: PropTypes.string,
};
