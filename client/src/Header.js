import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <a href="" className="logo">My Blog</a>
      <nav>
        <Link to="/login" className="login">Login</Link>
        <Link to="/logout" className="logout">Logout</Link>
      </nav>
    </header>
  );
}
