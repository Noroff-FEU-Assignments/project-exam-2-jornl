import { Button } from "react-bootstrap";
import { baseApiUrl } from "../../data/App";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DeletePost({ post }) {
  const [auth] = useContext(AuthContext);
  const url = `${baseApiUrl}/social/posts/${post}`;
  const navigate = useNavigate();

  function deletePost() {
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Button
        onClick={deletePost}
        type="button"
        variant="link"
        className="fw-bold text-danger"
      >
        <FontAwesomeIcon icon={faXmark} className="me-2" />
        Delete
      </Button>
    </>
  );
}

DeletePost.propTypes = {
  post: PropTypes.number,
};
