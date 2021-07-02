import { getConversationsCountByUser } from '@Actions/conversation-action';
import { serverAddress } from '@Constants/api-paths';
import * as RoutePaths from '@Constants/route-paths';
import React, { useEffect } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { BsChatSquareFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';

const socket = openSocket(serverAddress, { transports: ['websocket', 'polling', 'flashsocket'] });
const GlobalConversation = (props) => {
    const count = 100;
    useEffect(() => {
        const user = props.user;
        props.dispatch(getConversationsCountByUser(user._id));

        socket.on('Message_' + user._id.toString(), (success) => {
            console.log('🚀 ~ file: global-notification.js ~ line 87 ~ socket.on ~ success', success);
            if (success === 'NewMessage') {
                const audioEl = document.getElementsByClassName('audio-element-message')[0];
                audioEl.play();
                props.dispatch(getConversationsCountByUser(user._id));
            }
            if (success === 'Count') {
                const audioEl = document.getElementsByClassName('audio-element-message')[0];
                audioEl.play();
                props.dispatch(getConversationsCountByUser(user._id));
            }
        });
    }, []);
    return (
        <Button
            size="lg"
            className="notification-bell"
            onClick={() => {
                props.history.push(RoutePaths.ManageConversationPage);
            }}
        >
            <BsChatSquareFill />

            <Badge className="notification-count" variant="dark">
                {props.getConversationsCountResponse.success ? props.getConversationsCountResponse.totalUniqueEntity : 0}
            </Badge>
        </Button>
    );
};
const mapStateToProps = (state) => {
    const getConversationsCountResponse = state.Conversation.getConversationsCount;
    return { getConversationsCountResponse };
};

export default connect(mapStateToProps, null)(withRouter(GlobalConversation));
