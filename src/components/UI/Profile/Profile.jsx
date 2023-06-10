import { useContext } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import AuthContext from "@/contexts/AuthContext";
import defaultBanner from "@/assets/josh-hild-Qe3kgY98OXs-unsplash.jpg";
import defaultAvatar from "@/assets/circle-user-regular.svg";
import EditProfileModal from "./EditProfileModal";
import Header from "@/components/Common/Header";
import PostList from "@/components/UI/Post/PostList";
import PropTypes from "prop-types";
import ToggleFollow from "./ToggleFollow";
import FollowModal from "./FollowModal";

export default function Profile({ profile, fetchProfile }) {
  const [auth] = useContext(AuthContext);

  const banner =
    profile.banner && profile.banner !== "" ? profile.banner : defaultBanner;
  const avatar =
    profile.avatar && profile.avatar !== "" ? profile.avatar : defaultAvatar;

  return (
    <>
      <div
        className="profile__header"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          src={avatar}
          className="profile__avatar h-24"
          alt={`${profile.name}s avatar`}
        />
      </div>
      <Container className="py-5">
        <Row>
          <Col>
            {auth.name === profile.name ? (
              <div className="text-end pt-2">
                <EditProfileModal
                  profile={profile}
                  updateProfile={fetchProfile}
                />
              </div>
            ) : (
              <div className="pt-5"></div>
            )}

            <Header title={`${profile.name}'s profile`} className="text-center">
              {profile.name}
            </Header>

            <div className="follow__info mt-5 d-flex justify-content-around align-items-center">
              <FollowModal
                title="Followers"
                count={profile._count.followers}
                followers={profile.followers}
              />

              {auth.name === profile.name ? (
                <></>
              ) : (
                <ToggleFollow
                  user={profile.name}
                  following={profile.followers}
                  updateProfile={fetchProfile}
                />
              )}
              <FollowModal
                title="Following"
                count={profile._count.following}
                followers={profile.following}
              />
            </div>

            <div className="post__info">
              <h2 className="text-center mt-5 mb-3 fs-3">
                Posts ({profile._count.posts})
              </h2>

              <PostList posts={profile.posts} avatar={profile.avatar} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Profile.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    banner: PropTypes.string,
    name: PropTypes.string,
    _count: PropTypes.shape({
      followers: PropTypes.number,
      following: PropTypes.number,
      posts: PropTypes.number,
    }),
    posts: PropTypes.array,
    followers: PropTypes.array,
    following: PropTypes.array,
  }),
  fetchProfile: PropTypes.func,
};
