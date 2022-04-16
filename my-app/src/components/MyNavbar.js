import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Cookies from 'js-cookie';


const MyNavbar = ({ setToken }) => {
  function handleLogOut() {
    // Cookies.remove('token', { path: '' })
    setToken();
    localStorage.clear();
    // setToken(null);
    // axios.delete(`http://localhost:3000/logout`)
    //   .then(function (res) {
    //     if (res.status === 200) {
    //       console.log("logged out successfully");
    //     }
    //     else {
    //       console.log("error1: oops!! there was some ERROR");
    //     }
    //   }).catch(function (err) {
    //     console.log(err);
    //     console.log("oops!! API request failed");
    //   });
    // console.log("logged out")
  }
  return (
    <div>

      <Navbar bg="dark" variant="dark" style={{ height: "70px" }}>
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/notes">Notes</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/signup">Signup</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/login">login</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/feedback/browse/detailedReview">detailedReview</Nav.Link> */}

            <NavDropdown title="Feedback" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/feedback/create" >add review</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/feedback/browse" >browse reviews</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Notes" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/notes/create" >add notes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/notes/browse" >browse notes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Calendar" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/calendar/events" >Events</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calendar/timetable" >Time</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="CoursePlanner" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/planner" >Events</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/calendar/timetable" >Time</NavDropdown.Item> */}
            </NavDropdown>

            <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{ position: "absolute", right: "10px", color: "#ffffff" }}>
              <NavDropdown.Item as={Link} to="/profile" onClick={handleLogOut}>view profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile" onClick={handleLogOut}>progress dashboard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/" onClick={handleLogOut}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      {/* <br />
      <div id="nav-menu">
        <Link to='/' className="nav-menu-elements">
          home
        </Link>
        <Link to='/notes' className="nav-menu-elements">
          notes
        </Link>
        <Link to='/signup' className="nav-menu-elements">
          Sign Up
        </Link>
        <Link to='/login' className="nav-menu-elements">
          Login
        </Link>
        <Link to='/feedback' className="nav-menu-elements">
          feedback
        </Link>
      </div> */}
    </div>
  );
};

export default MyNavbar;