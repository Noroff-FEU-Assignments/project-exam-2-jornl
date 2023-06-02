import { Card } from "react-bootstrap";
import Avatar from "../../Common/Avatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

export default function ProfileList({ profiles }) {
  return (
    <div className="d-flex flex-column gap-4 mb-5">
      {profiles.map((profile) => (
        <Card className="shadow border-0" key={profile.name}>
          <Card.Body className="px-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Avatar className="h-12 me-2 me-md-3" avatar={profile.avatar} />
                <p className="mb-0">
                  <Link className="underline" to={`/profile/${profile.name}`}>
                    {profile.name}
                  </Link>
                </p>
              </div>
              <div>
                <span
                  className="me-4"
                  title={`${profile._count.followers} followers`}
                >
                  {profile._count.followers}
                  <FontAwesomeIcon icon={faUsers} className="ms-2" />
                </span>
                <span title={`${profile._count.posts} posts`}>
                  {profile._count.posts}
                  <FontAwesomeIcon icon={faComments} className="ms-2" />
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

ProfileList.propTypes = {
  profiles: PropTypes.array,
};
