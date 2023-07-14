import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { getAuth } from "firebase/auth";

function ProfilePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  const handleLogout = () => auth.signOut();
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
