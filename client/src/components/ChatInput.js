import React from 'react';

import { Button, Form, Row, Col } from 'react-bootstrap';
import '../css/ChatInput.css';


export default function ChatInput(props) {
    return (
        <Form>
            <Form.Group>
                {/* I would like to center these but don't know how for now */}
                <Row id="chatControls">
                    <Col xs={9} className="inputCol" id="inputMsgCol">
                        <Form.Control as="textarea" id="inputMsg" type='text' onKeyPress={(e) => e.charCode == 13 && e.ctrlKey ? sendMsg(e) : null} autoFocus />
                    </Col>
                    <Col xs={3} className="inputCol" id="sendBtnCol">
                        {/* doesn't refresh the page by default */}
                        <Button id="sendBtn" onClick={sendMsg} >Send</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form >
    );

    //invokes Chat's function handleSend because Chat manages messages state
    function sendMsg(e) {
        e.preventDefault();
        let inputMsg = document.getElementById('inputMsg');
        props.handleSend(inputMsg.value);
        inputMsg.value = '';
        inputMsg.focus();
    }

}