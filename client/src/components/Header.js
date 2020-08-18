import React from 'react';
import '../css/Header.css';
import { Navbar, Button, Nav } from 'react-bootstrap/';
import { Link } from 'react-router-dom';

export default function Header(props)
{
    return (
        <Navbar className = "border-bottom shadow-sm pr-3 pl-3" variant = "light" >
            <Navbar.Brand className = "mr-auto">Brand</Navbar.Brand>
            
            

            <Nav>
                <Nav.Item>
                    {/* <Nav.Link className = "navLink mr-3" eventKey = "Lobby" href = "kek"> */}
                    <Link className = "navLink nav-link mr-3 " to = "/login">Lobby</Link>
                    {/* </Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                    <Link className = "navLink nav-link mr-3" to = "/login">Top players</Link>
                    {/* <Nav.Link className = "navLink mr-3" eventKey = "TopPlayers" href="#">Top players</Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                    <Link className = "navLink nav-link mr-3" to = "/register">Profile</Link>
                    {/* <Nav.Link className = "navLink mr-3" eventKey = "Profile" href="#">Profile</Nav.Link> */}
                </Nav.Item>
            </Nav>

            <Button variant = "outline-primary" className = "mt-2 mb-2">Sign up</Button>
        </Navbar>
        
    )
}