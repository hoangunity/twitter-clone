import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

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
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">
            <i
              className="bi bi-twitter"
              style={{ fontSize: 30, color: "dodgerblue" }}
            ></i>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <h2>Your Profile</h2>
      </Container>
    </>
  );
}

export default ProfilePage;
