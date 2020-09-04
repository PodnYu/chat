import React, { useEffect } from "react";
import "../css/Header.css";
import { Navbar, Button, Nav } from "react-bootstrap/";
import { Link } from "react-router-dom";

export default function Header(props) {

  //Using Navbar.Collapse generates a warning 'index.js:1 Warning: findDOMNode is deprecated in StrictMode.'
  //when trying to collapse
  return (
    <Navbar className="border-bottom shadow-sm pr-3 pl-3" variant="light" expand='md'>
      <Navbar.Brand className="mr-auto"><Link to="/home" style={{
        textDecoration: 'none',
        color: 'black'
      }} >Dev{props.userName && ' : : ' + props.userName} </Link></Navbar.Brand>

      <Navbar.Toggle aria-controls="navigation" />

      <Navbar.Collapse id="navigation" >
        <Nav className="ml-auto">

          <Nav.Item>
            <Link className="navLink nav-link mr-3" to="/home">
              Home
          </Link>
          </Nav.Item>

          <Nav.Item>
            <Link className="navLink nav-link mr-3" to="/chatList">
              Chat
          </Link>
          </Nav.Item>

        </Nav>

        <>
          {props.auth ?

            <>

              <Button variant="outline-primary mt-2 mb-2 mr-2" onClick={props.logout}>
                Logout
            </Button>

            </> :

            <>
              <Link to="/login" className="btn btn-outline-primary mt-2 mb-2 mr-2">Sign In</Link>

              <Link to="/register" className="btn btn-outline-primary mt-2 mb-2">Sign Up</Link>
            </>

          }
        </>
      </Navbar.Collapse>
    </Navbar >
  );
}
