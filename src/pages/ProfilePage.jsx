import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";

import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProfilePage() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  // Check for authToken immediately upon component mount and whenever authToken changes
  useEffect(() => {
    if (!authToken) {
      navigate("/login"); // Redirect to login if no auth token is present
    }
  }, [authToken, navigate]);

  const handleLogout = () => {
    setAuthToken(""); // Clear the token from localStorage
  };

  return (
    <>
      <Container>
        <Row>
          <ProfileSideBar handleLogout={handleLogout} />
          <ProfileMidBody />
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
