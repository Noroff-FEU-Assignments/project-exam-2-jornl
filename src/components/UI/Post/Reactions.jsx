import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import configuredEmojis from "@/data/emojis.json";
import { useContext, useState } from "react";
import { baseApiUrl } from "@/data/App";
import axios from "axios";
import AuthContext from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import AlertBox from "../../Common/AlertBox";

export default function Reactions({ reactions, post, getPosts }) {
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isShowing, setIsShowing] = useState(false);

  function addReaction(reaction) {
    const url = `${baseApiUrl}/social/posts/${post}/react/${reaction}`;

    axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        getPosts();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsShowing(false));
  }

  if (error) {
    return <AlertBox level="danger">{error.message}</AlertBox>;
  }

  return (
    <div className="post__reactions d-flex relative">
      {reactions.map((reaction) => (
        <Button
          size="sm"
          variant="outline-primary me-2"
          key={reaction.symbol}
          onClick={() => addReaction(reaction.symbol)}
        >
          {reaction.symbol} {reaction.count}
        </Button>
      ))}
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => setIsShowing(!isShowing)}
      >
        + <FontAwesomeIcon icon={faSmile} />
      </Button>
      {isShowing && (
        <div className="reactions absolute  py-2 px-3 bg-white shadow rounded border-0">
          <p className="py-3 fw-semibold mb-0 fs-5">Add a reaction</p>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {configuredEmojis.map((emoji) => (
              <Button
                key={emoji.symbol}
                variant="outline-primary"
                className="fs-3 m-1"
                title={emoji.description}
                onClick={() => addReaction(emoji.symbol)}
              >
                {emoji.symbol}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Reactions.propTypes = {
  reactions: PropTypes.array,
  post: PropTypes.number,
  getPosts: PropTypes.func,
};
