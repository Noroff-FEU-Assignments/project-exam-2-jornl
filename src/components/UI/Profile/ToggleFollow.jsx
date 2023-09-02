import { useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import AlertBox from "@/components/Common/AlertBox";
import PropTypes from "prop-types";
import { baseApiUrl } from "@/data/App";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ToggleFollow({ user, following, updateProfile }) {
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(
    following.find((user) => {
      return user.name === auth.name;
    })
  );

  const url = isFollowing
    ? `${baseApiUrl}/social/profiles/${user}/unfollow`
    : `${baseApiUrl}/social/profiles/${user}/follow`;

  const text = isFollowing ? "Unfollow" : "Follow";
  const icon = isFollowing ? faUserSlash : faUserPlus;

  function toggleFollow() {
    axios({
      method: "put",
      url: url,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then(() => {
        setIsFollowing(!isFollowing);
        updateProfile();
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  if (error) {
    return <AlertBox level="danger">{error}</AlertBox>;
  }

  return (
    <Button onClick={toggleFollow} type="button" title={`${text} ${user}`}>
      <FontAwesomeIcon className="me-2" icon={icon} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

ToggleFollow.propTypes = {
  user: PropTypes.string,
  following: PropTypes.array,
  updateProfile: PropTypes.func,
};
