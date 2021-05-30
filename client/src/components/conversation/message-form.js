import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MessageAttachmentButtonRender, SendMessageButtonRender } from '../form_template/buttons-render';
const MessageForm = (props) => {
    const { messageText, setMessageText } = useState('');
    const onMessageSubmit = props.onMessageSubmit;
    // const messageText = props.messageText;
    // const setMessageText = props.setMessageText;
    return (
        <Container className="conversation-send-message">
            <Row>
                <Col sm="1">
                    <MessageAttachmentButtonRender />
                </Col>
                <Col sm="10">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Search Name"
                        rows="3"
                        value={messageText}
                        onChange={(e) => {
                            setMessageText(e.target.value);
                        }}
                    />
                </Col>
                <Col sm="1" className="right-align">
                    <SendMessageButtonRender
                        onClick={() => {
                            onMessageSubmit(messageText);
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default MessageForm;
