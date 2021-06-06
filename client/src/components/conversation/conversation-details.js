import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { OptionButtonRender, SendButtonRender, SendMessageButtonRender } from '../../components/form_template/buttons-render';
import moment from 'moment';
import MessageForm from './message-form';
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
const MessageAttachmentRender = (images) => {
    console.log('🚀 ~ file: conversation-details.js ~ line 20 ~ MessageAttachmentRender ~ images', images);
    return (
        <Row>
            <Col>
                {images.map((image, i) => {
                    return (
                        <Image
                            key={i}
                            src={image}
                            style={{ height: '100px', width: '100px', resizeMode: 'contain', backgroundColor: 'white' }}
                            thumbnail
                            square
                        />
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
    const messagesEnd = React.createRef();
    const conversation = props.conversation;
    const members = conversation.members;
    const messages = conversation.messages;
    const userId = props.userId;

    if (messages && messages.length > 0) {
        let memberObject = {};
        for (let i = 0; i < members.length; i++) {
            memberObject[members[i]._id] = members[i];
        }
        return (
            <>
                {' '}
                <Container className="conversation-details">
                    {messages.map((message, i) => {
                        console.log(message.attachments);
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
