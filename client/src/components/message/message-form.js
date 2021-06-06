import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { MessageAttachmentButtonRender, HiddenFileInputRender, SendMessageButtonRender } from '../form_template/buttons-render';
const MessageForm = (props) => {
    const hiddenFileInput = React.useRef(null);
    const onMessageSubmit = props.onMessageSubmit;
    const messageText = props.messageText;
    const setMessageText = props.setMessageText;
    const attachments = props.attachments;
    const setAttachments = props.setAttachments;
    const handleAddAttachment = (event) => {
        hiddenFileInput.current.click();
    };
    const handleAttachmentUpload = (event) => {
        var files = event.target.files;
        let attachments_ = attachments;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[i]);

                    reader.onload = () => {
                        console.log('🚀 ~ file: message-form.js ~ line 24 ~ handleAttachmentUpload ~ reader.result', reader.result);
                        attachments_.push(reader.result);
                        setAttachments([...attachments_]);
                    };
                    reader.onerror = function (error) {};
                }
            }
        }
        console.log('🚀 ~ file: message-form.js ~ line 29 ~ handleAttachmentUpload ~ attachments_', attachments_);
    };
    let enabled = false;
    if (messageText || (attachments && attachments.length > 0)) enabled = true;
    else enabled = false;
    return (
        <Container className="conversation-send-message">
            {attachments && attachments.length > 0 && (
                <Row>
                    <Col sm="12" className="attachment-row">
                        {attachments.map((attachment, i) => {
                            return <Image key={i} src={attachment} thumbnail width="100" className="attachment-single" />;
                        })}
                    </Col>
                </Row>
            )}
            <Row>
                <Col sm="1">
                    <MessageAttachmentButtonRender
                        onClick={() => {
                            handleAddAttachment();
                        }}
                    />
                    <HiddenFileInputRender multiple={true} hiddenFileInput={hiddenFileInput} handleAttachmentUpload={handleAttachmentUpload} />
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
                        disabled={!enabled}
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default MessageForm;
