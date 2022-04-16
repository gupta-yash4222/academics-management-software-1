import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import LikeButton from './LikeButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ReviewDetail = () => {
    const tags = ["tag1", "tag21", "tag24"];
    const tagList = tags.join(", ");
    const rating = 2.6;
    const username = "batman2.0";

    return (
        <div>
            <br></br>
            <Card style={{ color: "black", textAlign: "left", paddingLeft: "3%", paddingRight: "2%" }}>

                <div style={{ paddingTop: "2%" }}>
                    <h4 style={{ display: "inline" }}>Title of course</h4>
                    {/* <Stack gap={2} style={{ float: 'right'}}>
                    <img src="https://i.pravatar.cc/300" style={{ borderRadius: "50%", float: 'right', width: "25%", height: "25%" }} />
                        <span style={{ float: 'right', position: "" }}>{username}</span>
                    </Stack> */}

                    <span >
                        <img src="https://i.pravatar.cc/300" style={{ borderRadius: "50%", float: 'right', width: "5%", height: "5%" }} />
                        <p style={{ display: "block", float: 'right', position: "" }}>{username}</p>
                    </span>


                </div>
                <div style={{ paddingRight: "5%" }}>
                    <h6 >Course content:</h6>
                    <p>
                        Donec in est sed ligula molestie imperdiet. Aliquam sagittis magna id lorem congue, id elementum elit fermentum. Nulla facilisi. Donec ac metus vestibulum, vehicula augue vel, cursus ante. Sed dictum ante nec efficitur aliquet. Morbi viverra eleifend libero, at feugiat ante molestie nec. Duis eros quam, porta eget dolor sit amet, auctor bibendum tellus. Vivamus bibendum nunc a est sodales ultrices. Duis nisl ante, scelerisque in tortor eu, rutrum auctor purus.
                    </p>
                    {/* <br></br> */}
                    <h6>Course tags</h6>
                    <p>
                        {
                            tagList
                        }
                    </p>
                    <h6>Author comments:</h6>
                    <p>
                        Donec in est sed ligula molestie imperdiet. Aliquam sagittis magna id lorem congue, id elementum elit fermentum. Nulla facilisi. Donec ac metus vestibulum, vehicula augue vel, cursus ante. Sed dictum ante nec efficitur aliquet. Morbi viverra eleifend libero, at feugiat ante molestie nec. Duis eros quam, porta eget dolor sit amet, auctor bibendum tellus. Vivamus bibendum nunc a est sodales ultrices. Duis nisl ante, scelerisque in tortor eu, rutrum auctor purus
                    </p>
                    <h6>Course Rating by Author:</h6>
                    <span className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    cursor="auto"
                                    type="button"
                                    key={index}
                                    className={index <= (rating) ? "on" : "off"}
                                >
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </span>

                    {' '}
                    <Badge bg="success" width="40px" height="22px" verticalAlign="super">{rating}</Badge>
                    <p style={{ textAlign: "center", opacity: "0.5" }}>
                        posted on: {new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()}
                    </p>


                </div>

            </Card>
            <br />

            {/* <Row>
                <Col xs={7}>
                    <Form.Control placeholder="City" />
                </Col>

            </Row> */}
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label><strong>Add comment:</strong></Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    );
};

export default ReviewDetail;