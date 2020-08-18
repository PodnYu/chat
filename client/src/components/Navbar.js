import React from 'react';
import '../css/Navbar.css';
import { Navbar, Image, Button, Nav } from 'react-bootstrap/';

export default function Header()
{
    return (
        <Navbar bg = "light" variant = "light" className = "border-bottom shadow-sm pr-3 pl-3">
            <div className = "navbar-brand mr-auto">
                <Image src="img/honors_spade-14.png" height = "80px" alt="Durak" />
            </div>
            <Nav>
                <Nav.Item>
                    <Nav.Link className = "navLink mr-3" eventKey = "Lobby" href="#">Lobby</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className = "navLink mr-3" eventKey = "TopPlayers" href="#">Top players</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className = "navLink mr-3" eventKey = "Profile" href="#">Profile</Nav.Link>
                </Nav.Item>
            </Nav>

            <Button className = "btn mt-4 mb-4">Sign up</Button>
        </Navbar>
    )
}