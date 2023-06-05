import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "@/components/Common/Avatar";
import { format, formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Comment from "@/components/UI/Comment/Comment";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import DeletePost from "../DeletePost";
import CommentForm from "../Comment/CommentForm";
import Reactions from "../Reactions";

export default function Post({ post, className, getPosts }) {
  const [auth] = useContext(AuthContext);

  return (
    <Card className={`shadow border-0 ${className}`}>
      <Card.Body className="px-4">
        <div className="card__header d-flex align-items-center gap-3">
          <Link to={`/profile/${post.author.name}`}>
            <Avatar
              avatar={post.author.avatar}
              className="h-12 me-2 me-md-3 mb-2 mb-md-3"
            />
          </Link>
          <div className="flex-grow-1">
            <Link to={`/profile/${post.author.name}`} className="underline">
              {post.author.name}
            </Link>
            <p className="text-muted d-flex d-md-block justify-content-between">
              <span
                className="me-md-4"
                title={format(new Date(post.created), "HH:mm:ss dd/MM-yyyy")}
              >
                {formatDistance(new Date(post.created), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </p>
          </div>
          {post.author?.name === auth.name && (
            <>
              <Link to={`/posts/${post.id}/edit`} className="fw-bold underline">
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
          <Image src={post.media} fluid className="my-2 rounded" />
        )}
        <p
          className="border-bottom pb-3"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></p>

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
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    media: PropTypes.string,
    created: PropTypes.string,
    reactions: PropTypes.array,
    _count: PropTypes.shape({
      reactions: PropTypes.number,
      comments: PropTypes.number,
    }),
    author: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
      banner: PropTypes.string,
    }),
    comments: PropTypes.array,
  }),
  className: PropTypes.string,
  getPosts: PropTypes.func,
};
