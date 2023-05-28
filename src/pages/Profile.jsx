import { useContext, useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { baseApiUrl } from "@/config/App";
import Header from "@/components/Common/Header";
import AuthContext from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import defaultBanner from "@/assets/dummy_1920x400_000000_fa6a2c.png";
import defaultAvatar from "@/assets/circle-user-regular.svg";
import axios from "axios";
import PostList from "@/components/UI/PostList";
import AlertBox from "@/components/Common/AlertBox";

export default function Profile() {
  const [auth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  const profileUrl = baseApiUrl + `/social/profiles/${auth.name}?_posts=true`;

  useEffect(() => {
    axios
      .get(profileUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [auth.accessToken, profileUrl]);

  const banner = profile.banner ?? defaultBanner;
  const avatar = profile.avatar ?? defaultAvatar;

  console.log(profile);

  if (isLoading) {
    return <LoadingIndicator variant="secondary" />;
  }

  if (error) {
    return (
      <Container>
        <AlertBox message={error} level="danger" />
      </Container>
    );
  }

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
        <Image src={avatar} className="profile__avatar h-24" />
      </div>
      <Container className="py-5">
        {auth.name === profile.name ? (
          <div className="text-end pt-2">
            <Button>Edit Profile</Button>
          </div>
        ) : (
          <div className="pt-5"></div>
        )}

        <Header title={`${profile.name}'s profile`} className="text-center">
          {profile.name}
        </Header>

        <div className="follow__info mt-5 d-flex justify-content-around">
          <div>{profile._count.followers} Followers</div>
          {auth.name === profile.name ? <></> : <Button>Following</Button>}

          <div>{profile._count.following} Following</div>
        </div>

        <div className="post__info">
          <h2 className="text-center mt-5 mb-3 fs-3">
            Posts ({profile._count.posts})
          </h2>

          <PostList posts={profile.posts} avatar={profile.avatar} />
        </div>
      </Container>
    </>
  );
}
