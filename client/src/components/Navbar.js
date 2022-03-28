import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <div>
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
            <Link to='/calendar' className="nav-menu-elements">
              Calendar
            </Link>
          </div>
      </div>
    );
  };
    
  export default Navbar;