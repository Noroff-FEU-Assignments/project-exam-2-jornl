import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function AlertBox({ children, level = "success" }) {
  const icons = {
    success: faCircleCheck,
    warning: faCircleExclamation,
    danger: faCircleXmark,
    info: faCircleInfo,
  };

  return (
    <Alert variant={level}>
      <FontAwesomeIcon icon={icons[level]} className="me-3" />
      {children}
    </Alert>
  );
}

AlertBox.defaultProps = {
  level: "success",
};

AlertBox.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.oneOf(["success", "warning", "danger", "info"]),
};
