import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const loginImage = "https://sig1.co/img-twitter-1";
  const url =
    "https://auth-back-end-hoangunity.sigma-school-full-stack.repl.co";
  const navigate = useNavigate();

  // Possible values: null (no modal shows), "Login", "SignUp"
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const handleClose = () => setModalShow(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  useEffect(() => {
    if (authToken) {
      navigate("/profile");
    }
  }, [authToken, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/signup`, {
        username,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/login`, {
        username,
        password,
      });
      if (response.data && response.data.auth === true && response.data.token) {
        setAuthToken(response.data.token); // Save token to localStorage
        console.log("Login was successfully, token saved");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={6}>
        <i
          className="bi bi-twitter"
          style={{ fontSize: 50, color: "dodgerblue" }}
        ></i>

        <p className="mt-5" style={{ fontSize: 64 }}>
          Happening Now
        </p>
        <h2 className="my-5" style={{ fontSize: 31 }}>
          Join Twitter today.
        </h2>
        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-google"></i> Sign up with Google
          </Button>
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-apple"></i> Sign up with Apple
          </Button>
          <p style={{ textAlign: "center" }}>or</p>
          <Button className="rounded-pill" onClick={handleShowSignUp}>
            Create an account
          </Button>
          <p style={{ fontSize: "12px" }}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>

          <p className="mt-5" style={{ fontWeight: "bold" }}>
            Already have an account?
          </p>
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={handleShowLogin}
          >
            Sign in
          </Button>
        </Col>
      </Col>

      {/* Sign up Modal */}
      <Modal
        show={modalShow !== null}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Modal.Body className="d-grid gap-2 px-5">
          <h2 className="mb-4" style={{ fontWeight: "bold" }}>
            {modalShow === "SignUp"
              ? "Create your account"
              : "Log in to your account"}
          </h2>
          <Form
            className="d-grid gap-2 px-5"
            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                placeholder="Enter Email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <p style={{ fontSize: "12px" }}>
              By signing up, you agree to the Terms of Service and Privacy,
              including Cookie Use. SigmaTweets may use your contact
              information, including email address and phone number for purposes
              outlined in out Privacy Policy, like keeping your account secure
              and personalising our services, including ads. Learn more. Others
              will be able to find you by email or phone number, when provided,
              unless you choose otherwise here.
            </p>

            <Button className="rounded-pill" type="submit">
              {modalShow === "SignUp" ? "Sign up" : "Log in"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default AuthPage;
