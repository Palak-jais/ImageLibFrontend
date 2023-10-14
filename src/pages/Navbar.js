// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ui.css'

const NavigationBar = () => {
  return (
    <nav className='navbar'>
    <h1 className='nav-header'>ImageHub</h1>
      <ul className='links'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/hub">Images</Link>
        <Link className='link' to="/upload">Upload</Link>
        <Link className='link' to="/register">Register</Link>
        <Link className='link' to="/login">Login</Link>
        <Link className='link'  to="/logout">Logout</Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
