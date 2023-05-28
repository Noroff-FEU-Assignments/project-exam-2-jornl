import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
import defaultUser from "@/assets/circle-user-regular.svg";

export default function Avatar({ avatar, className }) {
  avatar = avatar ? avatar : defaultUser;

  return (
    <Image fluid className={`rounded-full avatar ${className}`} src={avatar} />
  );
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
};
