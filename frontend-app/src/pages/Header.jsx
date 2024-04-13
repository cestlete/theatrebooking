import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Theatre Booking
        </Link>
      </div>
    </header>
  );
};

export default Header;
