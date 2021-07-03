import React from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { SendMessageButtonRender } from '../form_template/buttons-render';
const MessageModal = (props) => {
    const messageModal = props.messageModal;
    const setMessageModal = props.messageModal;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={messageModal}
            onHide={() => {
                setMessageModal(false);
            }}
        >
            <Modal.Header closeButton>Send Message</Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <SendMessageButtonRender />
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
