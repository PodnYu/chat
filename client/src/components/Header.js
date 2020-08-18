import React from 'react';
import '../css/Header.css';
import { Navbar, Image, Button, Nav } from 'react-bootstrap/';

export default function Header()
{
    return (
        <Navbar className = "Header" variant = "light" className = "border-bottom shadow-sm pr-3 pl-3">
            <div className = "navbar-brand mr-auto">
                <Image src="img/honors_spade-14.png" height = "60px" alt="Durak" />
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

            <Button className = "btn mt-2 mb-2">Sign up</Button>
        </Navbar>
    )
}