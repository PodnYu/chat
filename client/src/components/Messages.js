import React, { useEffect, useRef } from 'react';

import { Container } from 'react-bootstrap';
import '../css/Messages.css';
import Message from './Message';

export default function Messages({ messages, user }) {

    // useEffect(() => {
    //     console.log('messages rendered', messages);
    // }, []);

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // console.log(user);
        // console.log(messages);
        // console.log('messages updated', messages);
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