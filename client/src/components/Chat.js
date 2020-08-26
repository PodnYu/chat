import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import '../css/Chat.css';

import ChatInput from './ChatInput';
import Messages from './Messages';

import { useParams } from 'react-router-dom';

import { Container } from 'react-bootstrap';

let io;
export default function Chat(props) {

    // let user = 'Alex';

    let user = props.user;

    const [messages, setMessages] = useState([]);

    const { room } = useParams();

    useEffect(() => {

        io = socketio('http://192.168.1.3:5000');

        io.emit('join', { user, room });

        io.on('controlMessage', message => {
            console.log('controlMessage: ' + message.text);
        });

        io.on('message', message => {
            setMessages(m => [...m, message]);
            console.log('message: ', message);
        });

        io.on('controlMessage', message => {
            setMessages(m => [...m, message]);
        });

        return () => {
            console.log('chat unmounted');
            // io.disconnect({ user, cb: () => console.log('callback fired!') });
            io.emit('goingToDisconnect', { user, room });
            io.disconnect();
            // io.off();
        }

    }, []);

    useEffect(() => {
        // console.log('messages updated: ', messages);
    }, [messages]);


    return (
        <Container id='chatContainer'>
            <h4 align="center">{room}</h4>
            <div>
                <Messages messages={messages} user={user} />

                <ChatInput handleSend={handleSend} />
            </div>
        </Container>
    );

    function handleSend(text) {

        let data = {
            user,
            text,
            room
        }

        // console.log(messages);
        // setMessages([...messages, { user: data.user, text: data.text }]);

        // console.log('data: ', data);

        io.emit('message', data);

        console.log('Sent: ' + text);

        setMessages([...messages, { user: user, text: data.text }]);
    }

}