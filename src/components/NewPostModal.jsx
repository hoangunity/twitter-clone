import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";

function NewPostModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");

  const handleSave = () => {
    dispatch(savePost(postContent));
    handleClose();
    setPostContent("");
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
