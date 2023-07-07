import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import ProfilePostCard from "./ProfilePostCard";

import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function ProfileMidBody() {
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
  const [posts, setPosts] = useState([]);

  const fetchPosts = (userId) => {
    fetch(
      `https://twitter-api-hoangunity.sigma-school-full-stack.repl.co/posts/user/${userId}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(`Error: ${err}`));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchPosts(userId);
    }
  }, []);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgray" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Hoangunity
      </p>
      <p style={{ marginBottom: "2px" }}>@hoangunity</p>
      <p>I love programming</p>
      <p>A humble person</p>
      <p>
        <strong>100</strong> Following <strong>10</strong> Followers
      </p>

      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>

      {posts.map((post) => (
        <ProfilePostCard
          key={post.id}
          content={post.content}
          postId={post.id}
        />
      ))}
    </Col>
  );
}

export default ProfileMidBody;
