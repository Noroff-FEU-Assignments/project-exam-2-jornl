import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { baseApiUrl } from "@/data/App";
import AuthContext from "@/contexts/AuthContext";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import axios from "axios";
import AlertBox from "@/components/Common/AlertBox";
import Profile from "@/components/UI/Profile/Profile";
import { useParams } from "react-router-dom";

export default function Show() {
  const [auth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  let { user } = useParams();

  if (!user) {
    user = auth.name;
  }

  const profileUrl =
    baseApiUrl +
    `/social/profiles/${user}?_posts=true&_followers=true&_following=true`;

  const fetchProfile = () => {
    axios
      .get(profileUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  return <Profile profile={profile} fetchProfile={fetchProfile} />;
}
