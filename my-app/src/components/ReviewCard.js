import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const ReviewCard = (props) => {
    function handleCardClick() {
        console.log("card clicked");
    }

    return (
        <div>
            <Card onClick={handleCardClick} style={{ cursor: "pointer", color: "black" }}>
                <Card.Body >
                    <Card.Title style={{ position: "absolute", top: "10px", left: "20px" }}>{props.courseTitle}</Card.Title>
                    <h5>
                        <Badge bg="secondary" style={{ position: "absolute", top: "10px", right: "10px" }}> rating: {props.courseRating}</Badge>
                    </h5>
                    <br></br>
                    <Card.Text style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                        <h6 style={{ position: "absolute", left: "20px" }}>course content:</h6>
                        <br></br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A pellentesque sit amet porttitor eget dolor. Rhoncus urna neque viverra justo nec ultrices dui. Cursus vitae congue mauris rhoncus aenean. Mauris ultrices eros in cursus turpis. Nunc non blandit massa enim nec dui. Rutrum quisque non tellus orci ac. Egestas dui id ornare arcu odio. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Diam phasellus vestibulum lorem sed risus ultricies. Sit amet est placerat in. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Rhoncus est pellentesque elit ullamcorper. Turpis egestas maecenas pharetra convallis posuere morbi leo. Senectus et netus et malesuada fames ac turpis egestas. Diam vel quam elementum pulvinar etiam non quam lacus. Donec massa sapien faucibus et molestie ac. Quis hendrerit dolor magna eget est lorem ipsum. Eget arcu dictum varius duis. Ultricies mi quis hendrerit dolor magna eget.

                        Mauris nunc congue nisi vitae suscipit tellus mauris. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Diam sit amet nisl suscipit adipiscing. Felis eget velit aliquet sagittis id consectetur purus ut. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Massa ultricies mi quis hendrerit. Ante in nibh mauris cursus mattis molestie a iaculis. Et malesuada fames ac turpis egestas sed. Neque vitae tempus quam pellentesque nec nam aliquam sem et. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Turpis egestas maecenas pharetra convallis posuere. Commodo odio aenean sed adipiscing diam donec adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Nisl purus in mollis nunc sed id semper risus. Accumsan sit amet nulla facilisi morbi tempus. Pharetra pharetra massa massa ultricies mi. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Tellus in hac habitasse platea.

                        Nulla pharetra diam s
                    </Card.Text>
                    <Button variant="success" style={{ position: "absolute", bottom: "10px", right: "10px" }}>Add to favourite</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ReviewCard;