import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThreadList from './sample-thread-list';
import { connect } from 'react-redux';
import ConversationDetails from '../../components/message/conversation-details';
import { OptionButtonRender, SendButtonRender, SendMessageButtonRender, DetailsButtonRender } from '../../components/form_template/buttons-render';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import { getAllConversationsByUser, getConversation, setMessage } from '../../actions/conversation-action';
import MessageForm from '../../components/message/message-form';
const Messages = (props) => {
    const [userId, setUserId] = useState('');
    const [allConversations, setAllConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState('');

    useEffect(() => {
        const user = props.auth.user;
        if (user && user._id) {
            console.log('🚀 ~ file: messages.js ~ line 16 ~ useEffect ~ user', user);
            setUserId(user._id);
            props.dispatch(getAllConversationsByUser(user._id));
        }
    }, []);
    useEffect(() => {
        const { success } = props.getAllConversationsResponse;
        if (success) {
            setAllConversations(props.getAllConversationsResponse.conversations);
            setSelectedConversation(props.getAllConversationsResponse.conversations[0]);
        }
    }, [props.getAllConversationsResponse]);
    const onMessageSubmit = (text) => {
        setMessage({
            senderId: userId,
            conversationId: selectedConversation._id,
            text,
        });
    };
    return (
        <Container className="parent-page">
            <Row>
                <Col sm={3}>
                    <ThreadList
                        allConversations={allConversations}
                        selectedConversation={selectedConversation}
                        setSelectedConversation={setSelectedConversation}
                        userId={userId}
                    />
                </Col>
                <Col sm={9}>
                    <ConversationDetails conversation={selectedConversation} userId={userId} />
                </Col>
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
export default connect(mapStateToProps, null)(Messages);
