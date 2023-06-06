import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format, formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultUser from "@/assets/circle-user-regular.svg";
import Avatar from "@/components/Common/Avatar";
import Comment from "@/components/UI/Comment/Comment";
import PropTypes from "prop-types";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DeletePost from "../DeletePost";
import CommentForm from "../Comment/CommentForm";
import Reactions from "../Reactions";

export default function PostList({ posts, avatar = "", getPosts }) {
  const [auth] = useContext(AuthContext);
  let userAvatar;
  let userName;

  return (
    <div className="d-flex flex-column gap-5">
      {posts.map((post) => {
        if (!post.author) {
          userAvatar = avatar && avatar !== "" ? avatar : defaultUser;
          userName = post.owner;
        }

        return (
          <Card key={post.id} className="shadow border-0">
            <Card.Body className="px-4">
              <div className="card__header d-flex align-items-center gap-3">
                <Link to={`/profile/${userName ?? post.author.name}`}>
                  <Avatar
                    avatar={userAvatar ?? post.author.avatar}
                    className="h-12 me-2 me-md-3 mb-2 mb-md-3"
                  />
                </Link>
                <div className="flex-grow-1">
                  <Link
                    to={`/profile/${userName ?? post.author.name}`}
                    className="underline"
                  >
                    {userName ?? post.author.name}
                  </Link>
                  <p className="text-muted d-flex d-md-block justify-content-between">
                    <span
                      className="me-md-4"
                      title={format(
                        new Date(post.created),
                        "HH:mm:ss dd/MM-yyyy"
                      )}
                    >
                      {formatDistance(new Date(post.created), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </p>
                </div>
                {(post.author?.name === auth.name ||
                  userName === auth.name) && (
                  <>
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="fw-bold underline"
                    >
                      <FontAwesomeIcon icon={faPencil} className="me-2" />
                      Edit
                    </Link>
                    <DeletePost post={post.id} />
                  </>
                )}
              </div>

              <h2 className="mb-1 fw-semibold fs-4">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              {post.media && (
                <Image src={post.media} fluid className="my-2 rounded" alt="" />
              )}
              <p className="border-bottom pb-3">{post.body}</p>

              <Reactions
                reactions={post.reactions}
                post={post.id}
                getPosts={getPosts}
              />

              <div className="post__comments mt-3">
                {/* TODO: Only display 2-3 comments and have a View More button. */}

                {post.comments &&
                  post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
              </div>

              <CommentForm post={post.id} getPosts={getPosts} />
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
  getPosts: PropTypes.func,
};
