import Header from "@/components/Common/Header";
import { Col, Container, Row } from "react-bootstrap";
import ProfileList from "@/components/UI/Profile/ProfileList";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import axios from "axios";
import { baseApiUrl } from "@/data/App";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import AlertBox from "@/components/Common/AlertBox";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [auth] = useContext(AuthContext);

  const profilesUrl = baseApiUrl + "/social/profiles?sort=name&sortOrder=asc";

  useEffect(() => {
    axios
      .get(profilesUrl, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setIsLoading(false));
  }, [auth.accessToken, profilesUrl]);

  if (isLoading) {
    return <LoadingIndicator variant="secondary" />;
  }

  if (error) {
    return (
      <Container>
        <AlertBox level="danger" message={error} />
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header title="Profiles" className="py-3">
            Latest users
          </Header>

          <ProfileList profiles={profiles} />
        </Col>
      </Row>
    </Container>
  );
}
