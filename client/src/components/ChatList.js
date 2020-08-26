import React, { useState } from 'react';
import '../css/ChatList.css';
import { Container, Button, Form, Card, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function ChatList({ auth }) {

    const [room, setRoom] = useState('');

    return (
        <div>
            <Container id="chatListContainer">
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Enter the Room Name:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setRoom(e.target.value)} autoFocus />
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Link className="linkToChat" to={`/chat/${room}`}>
                                        <Button type="button" className='roomNameBtn' block>
                                            Join
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link className="linkToChat" to="/chat">
                                        <Button type="button" className='roomNameBtn' block>
                                            Create
                                        </Button>
                                    </Link>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}