import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";

function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");

  const handleSave = () => {
    const token = localStorage.getItem("authToken");

    const decode = jwtDecode(token);
    const userId = decode.id;

    const data = {
      title: "Post title",
      content: postContent,
      user_id: userId,
    };

    axios
      .post(
        `https://twitter-api-hoangunity.sigma-school-full-stack.repl.co/posts`,
        data
      )
      .then((res) => {
        console.log(`Success: `, res.data);
        handleClose();
      })
      .catch((err) => {
        console.error(`Error: `, err);
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control
                placeholder="What is happening?"
                as="textarea"
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewPostModal;
