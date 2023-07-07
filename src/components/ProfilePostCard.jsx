import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";

function ProfilePostCard({ content, postId }) {
  const pic = `https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg`;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(
      `https://twitter-api-hoangunity.sigma-school-full-stack.repl.co/likes/post/${postId}`
    )
      .then((res) => res.json())
      .then((data) => setLikes(data.length))
      .catch((err) => console.error(`Error: ${err}`));
  }, [postId]);

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
          <Button variant="light">
            <i className="bi bi-heart"></i> {likes}
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
