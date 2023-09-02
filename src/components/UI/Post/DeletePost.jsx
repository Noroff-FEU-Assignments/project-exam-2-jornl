import { Button, Container } from "react-bootstrap";
import { baseApiUrl } from "@/data/App";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../Common/AlertBox";

export default function DeletePost({ post, getPosts }) {
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState(null);
  const url = `${baseApiUrl}/social/posts/${post}`;
  const navigate = useNavigate();

  function deletePost() {
    if (confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then(() => {
          navigate("/posts");
          getPosts();
        })
        .catch((error) => {
          setError(error);
        });
    }
  }

  if (error) {
    return (
      <Container>
        <AlertBox level="danger">{error.message}</AlertBox>
      </Container>
    );
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
  getPosts: PropTypes.func,
};
