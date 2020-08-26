import React from 'react';

import { Row, Col } from 'react-bootstrap';
import '../css/Message.css';

export default function Message({ message, user }) {

    let isClientMessage = message.user === user;

    return (
        <>
            {
                isClientMessage ? (
                    <div className="d-flex align-items-end flex-column bd-highlight" id="messageContainer">
                        <div className="bd-highlight" id="message"><span className='text-success'><b>You: </b></span> {message.text}</div>
                    </div>
                ) : (
                        <div className="d-flex align-items-start flex-column bd-highlight mb-1" id="messageContainer">
                            <div className="bd-highlight" id="message">
                                {/* <span><small>{message.user + ': '}</small></span><br /> */}
                                <span className='text-danger'><b>{message.user + ': '}</b></span>{message.text}</div>
                        </div>
                    )
            }

        </>

        // <div className="d-flex align-items-end flex-column bd-highlight mb-3">
        //     <div className="bd-highlight" id="message">Flex item</div>
        //     <div className="bd-highlight" id="message">Flex item</div>
        //     <div className="bd-highlight" id="message">Flex item</div>
        // </div>
    );
}