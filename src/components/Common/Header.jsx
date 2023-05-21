import PropTypes from "prop-types";
import { appName } from "@/config/App";

export default function Header({ title, as = "h1", className, children }) {
  document.title = title + " - " + appName;

  const Element = as;

  return <Element className={className}>{children}</Element>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
