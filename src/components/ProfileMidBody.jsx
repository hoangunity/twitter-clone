import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/postsSlice";
import ProfilePostCard from "./ProfilePostCard";
import { AuthContext } from "./AuthProvider";

export default function ProfileMidBody() {
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic =
    "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/317614510_6170451546316789_2356960875719193820_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7O5HbPnKnPoAX_Wg7a9&_nc_oc=AQmiVzuOj3hNmOPtvCm9PwQQ_KrEVRXa5zxmQ79fR2X7L1k2p8wmiCfjbWQFGERI9vyh0Q8eRfLaS4zuZdRL2r9c&_nc_ht=scontent-hkg4-1.xx&oh=00_AfAudrpMTpyrnfg2zpwRCOARbCY4JA_kXYU1NVvDhZgipg&oe=64B34A61";

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPostsByUser(currentUser.uid));
  }, [dispatch, currentUser]);
  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />

      <Image
        src={pic}
        roundedCircle
        style={{
          position: "absolute",
          top: "140px",
          marginLeft: 15,
          width: 150,
          border: "4px solid #F8F9FA",
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
        Haris
      </p>
      <p style={{ marginBottom: "2px" }}>@haris.samingan</p>
      <p>I help people</p>
      <p>Entrepreneur</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="replies">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="highlights">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="media">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="likes">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} />
      ))}
    </Col>
  );
}
