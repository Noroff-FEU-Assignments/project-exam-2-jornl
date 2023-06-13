import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ProfileList from "./ProfileList";

export default function FollowModal({ followers, title, count }) {
  const [isShowing, setIsShowing] = useState(false);

  const closeModal = () => setIsShowing(false);
  const openModal = () => setIsShowing(true);

  return (
    <>
      <Button variant="outline-primary" onClick={openModal} type="button">
        {count} {title}
      </Button>

      <Modal show={isShowing} onHide={closeModal}>
        <Modal.Header closeButton>
          <h2>{title}</h2>
        </Modal.Header>
        <Modal.Body>
          {followers.length > 0 ? (
            <ProfileList profiles={followers} reload={true} />
          ) : (
            <p>No one :-(</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

FollowModal.propTypes = {
  followers: PropTypes.array,
  count: PropTypes.number,
  title: PropTypes.string,
};
