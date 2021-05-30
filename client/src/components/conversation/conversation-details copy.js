import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { OptionButtonRender, SendButtonRender, SendMessageButtonRender } from '../../components/form_template/buttons-render';
import moment from 'moment';
import MessageForm from './message-form';
const MessageTextRender = (text) => {
    const textArray = text.split('\n');
    return textArray.map((text, i) => {
        return (
            <div className="message-text">
                {text}
                <br />
            </div>
        );
    });
};
const ThreadDetails = (props) => {
    const conversation = props.conversation;
    const members = conversation.members;
    const messages = conversation.messages;
    const userId = props.userId;

    console.log('🚀 ~ file: sample-thread-details.js ~ line 5 ~ ThreadDetails ~ conversation', conversation);

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
                        return (
                            <Row className="message-main">
                                <Col sm="1">
                                    {userId === message.senderId ? (
                                        // <OptionButtonRender />
                                    ) : (
                                        <Avatar size="32" round="5px" src={memberObject[message.senderId].basicInfo.profilePicture} />
                                    )}
                                </Col>
                                <Col sm="10">
                                    <div className="message-box">{MessageTextRender(message.text)}</div>
                                    <small> {moment(message.createdAt).format('LLLL')}</small>
                                </Col>

                                <Col sm="1" className="right-align">
                                    {userId === message.senderId ? (
                                        <Avatar size="32" round="5px" src={memberObject[message.senderId].basicInfo.profilePicture} />
                                    ) : (
                                        // <OptionButtonRender />
                                    )}
                                </Col>

                                <br />
                            </Row>
                        );
                    })}
                </Container>
                <MessageForm
                    onMessageSubmit={props.onMessageSubmit}
                    // messageText={messageText} setMessageText={setMessageText}
                />
            </>
        );
    } else return <> No Message Found</>;
};

export default ThreadDetails;
