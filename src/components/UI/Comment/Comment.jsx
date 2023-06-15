import { Link } from "react-router-dom";
import Avatar from "@/components/Common/Avatar";
import PropTypes from "prop-types";
import { format, formatDistance } from "date-fns";

export default function Comment({ comment }) {
  return (
    <div className="comment mb-2">
      <div className="comment__userinfo d-flex">
        <Link to={`/profile/${comment.author.name}`}>
          <Avatar avatar={comment.author.avatar} className="h-10 me-3 mb-2" />
        </Link>
        <div className="flex-grow-1">
          <Link className="underline" to={`/profile/${comment.author.name}`}>
            {comment.author.name}
          </Link>
          <p className="text-muted d-flex d-md-block justify-content-between">
            <span
              className="me-md-4"
              title={format(new Date(comment.created), "HH:mm:ss dd/MM-yyyy")}
            >
              {formatDistance(new Date(comment.created), new Date(), {
                addSuffix: true,
              })}
            </span>
          </p>
        </div>
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
    created: PropTypes.string,
  }),
};
