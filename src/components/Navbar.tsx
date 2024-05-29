import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 10px;
  background: palevioletred;
  color: white;
`;

const Navbar = () => (
  <Nav>
    <Link to="/">Home</Link> | <Link to="/bookings">Your Bookings</Link>
  </Nav>
);

export default Navbar;
