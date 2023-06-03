import { Link } from "react-router-dom";
import Avatar from "../../Common/Avatar";
import PropTypes from "prop-types";

export default function Comment({ comment }) {
  return (
    <div className="comment mb-2">
      <div className="comment__userinfo d-flex">
        <Avatar avatar={comment.author.avatar} className="h-10 me-3 mb-2" />
        <Link className="underline" to={`/profile/${comment.author.name}`}>
          {comment.author.name}
        </Link>
      </div>

      <p>{comment.body}</p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
    }),
    body: PropTypes.string,
  }),
};
