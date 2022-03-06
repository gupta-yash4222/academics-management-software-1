import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <div>
          <div id="nav-menu">
            <Link to='/about' className="nav-menu-elements">
              About
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