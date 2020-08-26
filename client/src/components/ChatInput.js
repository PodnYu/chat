import React from 'react';
import '../css/ChatInput.css';

import { Button, Form, Row, Col } from 'react-bootstrap';


export default function ChatInput(props) {
    return (
        <Form>
            <Form.Group>
                <Row id="chatControls">
                    <Col xs={10} className="inputCol" id="inputMsgCol">
                        <Form.Control id="inputMsg" type='text' onKeyPress={(e) => e.charCode == 13 ? sendMsg(e) : null} autoFocus />
                    </Col>
                    <Col xs={2} className="inputCol" id="sendBtnCol">
                        {/* doesn't refresh the page by default */}
                        <Button id="sendBtn" onClick={sendMsg} >Send</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );

    function sendMsg(e) {
        e.preventDefault();
        let inputMsg = document.getElementById('inputMsg');
        props.handleSend(inputMsg.value);
        inputMsg.value = '';
    }

}