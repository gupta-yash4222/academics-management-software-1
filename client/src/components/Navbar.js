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
            <Link to='/signup' className="nav-menu-elements">
              Sign Up
            </Link>
            <Link to='/login' className="nav-menu-elements">
              Login
            </Link>
          </div>
      </div>
    );
  };
    
  export default Navbar;