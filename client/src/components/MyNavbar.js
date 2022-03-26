import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNavbar = () => {
  function handleLogOut(){
    console.log("logged out")
  }
  return (
    <div>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
            <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/login">login</Nav.Link>
            <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{position:"absolute", right:"10px", color:"#ffffff"}}>
              <NavDropdown.Item as={Link} to="/" onClick={handleLogOut}>Log out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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