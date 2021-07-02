import { OptionButtonRender } from '@Components/form_template/buttons-render';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { MessageImageModalRender } from '../form_template/image-modal-render';

const MessageTextRender = (text) => {
    const textArray = text.split('\n');
    return textArray.map((text, i) => {
        return (
            <div className="message-text" key={i}>
                {text}
                <br />
            </div>
        );
    });
};

const MessageAttachmentRender = (attachments) => {
    return (
        <Row>
            <Col>
                {attachments.map((attachment, i) => {
                    return (
                        <div key={i}>
                            <a download={attachment.fileName} className="special-btn attachment-single-file" href={attachment.data} target="blank">
                                {attachment.fileName}
                            </a>
                            <br />
                        </div>
                    );
                })}
            </Col>
        </Row>
    );
};
const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};
const ThreadDetails = (props) => {
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    // const messagesEnd = React.createRef();
    const conversation = props.conversation;
    const members = conversation.members;
    const messages = conversation.messages;
    const userId = props.userId;

    const MessageImageRender = (images) => {
        return (
            <Row>
                <Col>
                    {images.map((image, i) => {
                        return (
                            <Image
                                onClick={() => {
                                    setSelectedImage(image);
                                    setImageModal(true);
                                }}
                                className="special-btn"
                                key={i}
                                src={image}
                                style={{ height: '100px', width: '100px', resizeMode: 'contain', backgroundColor: 'white' }}
                                thumbnail
                                rounded
                            />
                        );
                    })}
                </Col>
            </Row>
        );
    };

    if (messages && messages.length > 0) {
        let memberObject = {};
        for (let i = 0; i < members.length; i++) {
            memberObject[members[i]._id] = members[i];
        }
        return (
            <>
                {' '}
                <Container className="conversation-details">
                    <MessageImageModalRender imageModal={imageModal} setImageModal={setImageModal} image={selectedImage} />
                    {messages.map((message, i) => {
                        // console.log(message.attachments);
                        return (
                            <Row className="message-main" key={i}>
                                <Col sm="1">
                                    {userId === message.senderId ? (
                                        <OptionButtonRender />
                                    ) : (
                                        <Avatar size="32" round="5px" src={memberObject[message.senderId].basicInfo.profilePicture} />
                                    )}
                                </Col>
                                <Col sm="10">
                                    <div className="message-box">
                                        {MessageTextRender(message.text)}
                                        {message.images && message.images.length > 0 && MessageImageRender(message.images)}
                                        {message.attachments && message.attachments.length > 0 && MessageAttachmentRender(message.attachments)}
                                    </div>
                                    <small> {moment(message.createdAt).format('LLLL')}</small>
                                </Col>

                                <Col sm="1" className="right-align">
                                    {userId === message.senderId ? (
                                        <Avatar size="32" round="5px" src={memberObject[message.senderId].basicInfo.profilePicture} />
                                    ) : (
                                        <OptionButtonRender />
                                    )}
                                </Col>
                                <br />
                            </Row>
                        );
                    })}
                    <AlwaysScrollToBottom />
                </Container>
            </>
        );
    } else return <> No Message Found</>;
};

export default ThreadDetails;
