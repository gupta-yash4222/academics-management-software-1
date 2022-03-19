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
            <Link to='/blogs' className="nav-menu-elements">
              Blogs
            </Link>
            <Link to='/sign-up' className="nav-menu-elements">
              Sign Up
            </Link>
          </div>
      </div>
    );
  };
    
  export default Navbar;