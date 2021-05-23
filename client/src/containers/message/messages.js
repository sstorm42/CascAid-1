import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThreadList from './sample-thread-list';
import { connect } from 'react-redux';
import ThreadDetails from './sample-thread-details';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar } from '@chatscope/chat-ui-kit-react';
import { getAllConversationsByUser, getConversation } from '../../actions/conversation-action';
const Messages = (props) => {
    const [user, setUser] = useState('');
    const [allConversations, setAllConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState('');
    const joeIco = 'https://picsum.photos/100/100';
    const anotherIco = 'https://picsum.photos/50/50';
    useEffect(() => {
        const user = props.auth.user;
        if (user && user._id) {
            console.log('🚀 ~ file: messages.js ~ line 16 ~ useEffect ~ user', user);
            setUser(user._id);
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
    const chats = [
        { src: joeIco, name: 'Joe', message: 'Hi.' },
        { src: anotherIco, name: 'John', message: 'Hello.' },
        { src: joeIco, name: 'Joe', message: 'How are you.' },
        { src: anotherIco, name: 'John', message: 'Fine, You?' },
        { src: joeIco, name: 'Joe', message: 'Good. What are you doing?' },
        { src: anotherIco, name: 'John', message: 'Playing.You?' },
        { src: joeIco, name: 'Joe', message: 'Writing. Ok, Bye' },
        { src: anotherIco, name: 'John', message: 'Bye.' },
    ];
    return (
        <Container className="parent-page">
            <Row>
                <Col sm={3}>
                    <ThreadList
                        allConversations={allConversations}
                        selectedConversation={selectedConversation}
                        setSelectedConversation={setSelectedConversation}
                    />
                </Col>
                <Col>
                    <div style={{ position: 'relative', height: '500px' }}>
                        <MainContainer>
                            <ChatContainer>
                                <MessageList>
                                    {chats.map((chat, i) => {
                                        return (
                                            <div key={i}>
                                                <Message.Header sentTime="just now" />
                                                <Avatar src={chat.src} name={chat.name} />
                                                <Message
                                                    model={{
                                                        message: chat.message,
                                                        sentTime: 'just now',
                                                        sender: 'Joe',
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </MessageList>
                                <MessageInput placeholder="Type message here" />
                            </ChatContainer>
                        </MainContainer>
                    </div>
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
