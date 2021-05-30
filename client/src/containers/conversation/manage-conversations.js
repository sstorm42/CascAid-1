import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ConversationList from '../../components/conversation/conversation-list';
import { connect } from 'react-redux';
import * as RoutePaths from '../../constants/route-paths';
import ConversationDetails from '../../components/conversation/conversation-details';
import {
    getAllConversationsByUser,
    getConversation,
    setMessage,
    getMessageTextFromLS,
    setMessageTextOnLS,
    printMessageTextOnLS,
    removeAllMessagesOnLS,
} from '../../actions/conversation-action';
import { serverAddress } from '../../constants/api-paths';
import MessageForm from '../../components/message/message-form';
import useSound from 'use-sound';
import openSocket from 'socket.io-client';

const socket = openSocket(serverAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
const Conversations = (props) => {
    const [messageText, setMessageText] = useState('');
    const [userId, setUserId] = useState('');
    useEffect(() => {
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            socket.on('Message_' + user._id.toString(), (success) => {
                console.log('🚀 ~ file: global-notification.js ~ line 87 ~ socket.on ~ success', success);
                if (success === 'NewMessage') {
                    const audioEl = document.getElementsByClassName('audio-element-message')[0];
                    audioEl.play();
                    const conversationId = props.match.params.conversationId;
                    props.dispatch(getConversation(conversationId));
                    // props.dispatch(getNotificationsCount(true));
                    // props.dispatch(getTopNotifications());
                }
            });
            props.dispatch(getAllConversationsByUser(user._id));
        }
    }, []);
    useEffect(() => {
        // removeAllMessagesOnLS();
        const conversationId = props.match.params.conversationId;
        if (conversationId !== 'all') {
            props.dispatch(getConversation(conversationId));
            setMessageText(getMessageTextFromLS(conversationId));
        }
    }, [props.match.params.conversationId]);
    const onMessageSubmit = (text) => {
        props.dispatch(
            setMessage({
                senderId: userId,
                conversationId: props.match.params.conversationId,
                text,
            }),
        );
        setMessageText('');
        setMessageTextOnLS(props.match.params.conversationId, '');
    };
    const handleGoToConversationDetails = (conversationId) => {
        setMessageTextOnLS(props.match.params.conversationId, messageText);
        setMessageText('');
        props.history.push(RoutePaths.ConversationPage(conversationId));
    };
    return (
        <Container className="parent-page">
            <Row>
                <Col>
                    <label>
                        This Buttons are for <b>Development Purpose Only</b>
                    </label>
                </Col>
                <Col>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            removeAllMessagesOnLS();
                        }}
                    >
                        Remove All Cache
                    </Button>
                    &nbsp;
                    <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                            printMessageTextOnLS();
                        }}
                    >
                        Print All Cache
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col sm={3}>
                    <ConversationList
                        allConversations={props.getAllConversationsResponse.success ? props.getAllConversationsResponse.conversations : []}
                        userId={userId}
                        handleGoToConversationDetails={handleGoToConversationDetails}
                        conversationId={props.match.params.conversationId}
                    />
                </Col>
                {props.match.params.conversationId !== 'all' && (
                    <Col sm={9}>
                        <ConversationDetails
                            conversation={props.getConversationResponse.success ? props.getConversationResponse.conversation : {}}
                            userId={userId}
                        />

                        <MessageForm
                            onMessageSubmit={onMessageSubmit}
                            messageText={messageText}
                            setMessageText={setMessageText}
                            // messageText={messageText} setMessageText={setMessageText}
                        />
                    </Col>
                )}
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    console.log('🚀 ~ file: messages.js ~ line 67 ~ mapStateToProps ~ state', state.Conversation);

    const getAllConversationsResponse = state.Conversation.getAllConversationsByUser;
    const getConversationResponse = state.Conversation.getConversation;
    return { getAllConversationsResponse, getConversationResponse };
};
export default connect(mapStateToProps, null)(Conversations);
