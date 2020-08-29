import React, { useEffect, useRef } from 'react';

import { Container } from 'react-bootstrap';
import '../css/Messages.css';
import Message from './Message';

export default function Messages({ messages, user }) {

    const messagesContainerRef = useRef(null);

    useEffect(() => {

        //scroll to bottom only if the new added message was sent by client
        if (messages.length > 0 && messages[messages.length - 1].user === user)
            messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });

    }, [messages]);

    return (
        <Container id="messagesContainer">
            <div>
                {
                    messages.map((message, i) => <div key={i}><Message message={message} user={user} /></div>)
                }
            </div>
            <div ref={messagesContainerRef} />
        </Container>
    );
}