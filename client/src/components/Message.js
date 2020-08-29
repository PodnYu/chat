import React from 'react';

import '../css/Message.css';

export default function Message({ message, user }) {

    let isClientMessage = message.user === user;

    return (

        <div id="messageContainer">
            <div id="message">

                <span className={isClientMessage ? 'text-success' : 'text-danger'}>
                    <b>{(isClientMessage ? 'You' : message.user) + ': '}</b>
                </span>

                {message.text}
            </div>
        </div>
    );
}