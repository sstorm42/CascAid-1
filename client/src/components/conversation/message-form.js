import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import {
    DeleteAttachmentButtonRender,
    DeleteButtonRender,
    HiddenFileInputRender,
    MessageAttachmentButtonRender,
    MessageImageUploadButtonRender,
    SendMessageButtonRender,
} from '../form_template/buttons-render';
const MessageForm = (props) => {
    const hiddenFileInput = React.useRef(null);
    const hiddenImageInput = React.useRef(null);
    const onMessageSubmit = props.onMessageSubmit;
    const messageText = props.messageText;
    const setMessageText = props.setMessageText;
    const attachments = props.attachments;
    const setAttachments = props.setAttachments;
    const images = props.images;
    const setImages = props.setImages;
    const handleAddImage = (event) => {
        hiddenImageInput.current.click();
    };
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
                    let name = files[i].name;
                    let extension = name.split('.').pop();
                    console.log('🚀 ~ file: message-form.js ~ line 36 ~ handleAttachmentUpload ~ name', name);

                    reader.onload = () => {
                        console.log('🚀 ~ file: message-form.js ~ line 24 ~ handleAttachmentUpload ~ reader.result', reader);
                        attachments_.push({
                            fileName: name,
                            extension,
                            data: reader.result,
                        });
                        setAttachments([...attachments_]);
                    };
                    reader.onerror = function (error) {};
                }
            }
        }
        console.log('🚀 ~ file: message-form.js ~ line 29 ~ handleAttachmentUpload ~ attachments_', attachments_);
    };
    const handleImageUpload = (event) => {
        var files = event.target.files;
        let images_ = images;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[i]);

                    reader.onload = () => {
                        console.log('🚀 ~ file: message-form.js ~ line 24 ~ handleAttachmentUpload ~ reader.result', reader);
                        images_.push(reader.result);
                        setImages([...images_]);
                    };
                    reader.onerror = function (error) {};
                }
            }
        }
        console.log('🚀 ~ file: message-form.js ~ line 29 ~ handleAttachmentUpload ~ attachments_', images_);
    };
    const handleImageDelete = (idx) => {
        console.log('🚀 ~ file: message-form.js ~ line 68 ~ handleImageDelete ~ idx', idx);
        let images_ = images;
        images_.splice(idx, 1);
        setImages([...images_]);
    };
    const handleFileDelete = (idx) => {
        console.log('🚀 ~ file: message-form.js ~ line 68 ~ handleImageDelete ~ idx', idx);
        let attachments_ = attachments;
        attachments_.splice(idx, 1);
        setAttachments([...attachments_]);
    };

    let enabled = false;
    if (messageText || (attachments && attachments.length > 0) || (images && images.length > 0)) enabled = true;
    else enabled = false;
    return (
        <Container className="conversation-send-message">
            <Row>
                {images && images.length > 0 && (
                    <Col sm="12" className="attachment-row">
                        {images.map((image, i) => {
                            return (
                                <div key={i} className="message-file-preview">
                                    <Row>
                                        <Image src={image} width="70" className="attachment-single" />
                                        <DeleteAttachmentButtonRender
                                            onClick={() => {
                                                handleImageDelete(i);
                                            }}
                                        />
                                    </Row>
                                </div>
                            );
                        })}
                    </Col>
                )}
                {attachments && attachments.length > 0 && (
                    <Col sm="12" className="attachment-row">
                        {attachments.map((attachment, i) => {
                            return (
                                <Row key={i} className="">
                                    <Col>
                                        <small className="attachment-single-file-upload">{attachment.fileName}</small>
                                    </Col>
                                    <Col>
                                        <DeleteButtonRender
                                            onClick={() => {
                                                handleFileDelete(i);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            );
                        })}
                    </Col>
                )}
            </Row>
            <Row>
                <Col sm="1">
                    <MessageImageUploadButtonRender
                        onClick={() => {
                            handleAddImage();
                        }}
                    />
                    <HiddenFileInputRender multiple={true} hiddenInputRef={hiddenImageInput} handleUpload={handleImageUpload} accept="image/*" />
                    <div style={{ height: '5px' }} />
                    <MessageAttachmentButtonRender
                        onClick={() => {
                            handleAddAttachment();
                        }}
                    />
                    <HiddenFileInputRender
                        multiple={true}
                        hiddenInputRef={hiddenFileInput}
                        handleUpload={handleAttachmentUpload}
                        accept=".pdf, .doc, .mp4, .json, .txt"
                    />
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
