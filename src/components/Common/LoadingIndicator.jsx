import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function LoadingIndicator({
  variant = "dark",
  animation = "border",
  size,
}) {
  return (
    <div className="mx-auto text-center my-5">
      <Spinner
        variant={variant}
        animation={animation}
        aria-hidden="true"
        role="status"
        size={size}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

LoadingIndicator.defaultProps = {
  variant: "dark",
  animation: "border",
};

LoadingIndicator.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  animation: PropTypes.oneOf(["border", "grow"]),
  size: PropTypes.oneOf(["sm"]),
};
