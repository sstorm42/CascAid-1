import React, { useState } from 'react';
import { Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { CancelButtonRender, SendMessageButtonRender } from '../form_template/buttons-render';
const MessageModal = (props) => {
    const [message, setMessage] = useState('');
    const messageReceiver = props.messageReceiver;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={props.messageModal}
            onHide={() => {
                props.setMessageModal(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Send Message To {messageReceiver.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <label>Message</label>
                    </Row>
                    <Row>
                        <textarea
                            className="form-control"
                            rows="5"
                            type="text"
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            placeholder="Hi..."
                        />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <SendMessageButtonRender
                    onClick={() => {
                        props.handleSendNewMessage(messageReceiver.userId, message);
                    }}
                />
                {/* &nbsp;
                <CancelButtonRender /> */}
            </Modal.Footer>
        </Modal>
    );
};
export default MessageModal;
