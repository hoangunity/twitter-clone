import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

function ProfilePostCard({ content, postId }) {
  const pic = `https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg`;
  const BASE_URL = `https://twitter-api-hoangunity.sigma-school-full-stack.repl.co`;
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.id;

  useEffect(() => {
    fetch(`${BASE_URL}/likes/post/${postId}`)
      .then((res) => res.json())
      .then((data) => setLikes(data))
      .catch((err) => console.error(`Error: ${err}`));
  }, [BASE_URL, postId]);

  const isLiked = likes.some((like) => like.user_id === userId);

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  const addToLikes = () => {
    setLikes([...likes, { user_id: userId }]);

    axios.post(`${BASE_URL}/likes`, {
      user_id: userId,
      post_id: postId,
    });
  };

  const removeFromLikes = () => {
    const like = likes.find((like) => like.user_id === userId);
    if (like) {
      axios.delete(`${BASE_URL}/likes/${like.likes_id}`);
      setLikes(likes.filter((like) => like.user_id !== userId));
    }
  };

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Hoang</strong>
        <span> @hoangunity &#183; Apr 16</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
            <span className="ms-1">{likes.length}</span>
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePostCard;
