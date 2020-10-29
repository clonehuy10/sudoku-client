import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Clock from '../Clock/Clock'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown.Item href="#home">Home</NavDropdown.Item>
    <NavDropdown.Item href="#history">History</NavDropdown.Item>
    <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item >
    <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown.Item href="#/">Sign Up</NavDropdown.Item>
    <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand>
      <div className='clockHead'><Clock /></div>
    </Navbar.Brand>

    <Nav>
      <h1 className='textHead'>Sudoku</h1>
    </Nav>

    <Nav className="ml-auto setting">
      { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
      <NavDropdown
        drop='left'
        title="Setting"
        id="collasible-nav-dropdown">
        { user ? authenticatedOptions : unauthenticatedOptions }
      </NavDropdown>
    </Nav>

  </Navbar>
)

export default Header

// <Navbar.Toggle aria-controls="basic-navbar-nav" />
// <Navbar.Collapse id="basic-navbar-nav">
//   <Nav>
//     <h1 className='textHead'>Sudoku</h1>
//   </Nav>
//   <Nav className="ml-auto">
//     { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
//     {/* { alwaysOptions } */}
//   </Nav>
//   <NavDropdown>
//     { user ? authenticatedOptions : unauthenticatedOptions }
//   </NavDropdown>
// </Navbar.Collapse>

// <Nav className="ml-auto">
//       { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
//       {/* { alwaysOptions } */}
//     </Nav>
//     { user ? authenticatedOptions : '' }
