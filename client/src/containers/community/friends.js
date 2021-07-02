import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '@Components/community/community-menu';
import LoadingAnim from '@Components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import FriendsList from '@Components/community/friends-list';
import { getAllFriendships } from '@Actions/friendship-action';
import * as RoutePaths from '@Constants/route-paths';
import { setMessage } from '@Actions/conversation-action';
import MessageModal from '@Components/conversation/message-modal';
import { NotificationManager } from 'react-notifications';
const CommunityFriends = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState('');
    useEffect(() => {
        const getInitialInfo = (userId) => {
            console.log('Calling API');
            setLoading(true);
            props.dispatch(getAllFriendships(userId, 'accepted'));
            setLoading(false);
        };
        const user = props.auth.user;
        if (user && user._id) {
            setUserId(user._id);
            setUserType(user.userType);
            getInitialInfo(user._id);
        }
    }, []);
    useEffect(() => {
        const { success } = props.setMessageResponse;
        if (success) {
            NotificationManager.success('Message sent', 'success');
        } else if (success === false) NotificationManager.error('Message is not sent', 'Failed');
    }, [props.setMessageResponse]);
    const handleGotoUserDetails = (individualUserId) => {
        props.history.push(RoutePaths.userDetailsPage('individual', individualUserId));
    };
    const handleOpenMessageModal = (user) => {
        setMessageModal(true);
        setMessageReceiver(user);
    };
    const handleSendNewMessage = (receiverId, text) => {
        props.dispatch(
            setMessage({
                senderId: userId,
                receiverId,
                text,
            }),
        );
        setMessageModal(false);
    };
    if (loading) return <LoadingAnim />;
    else {
        return (
            <Container>
                <MessageModal
                    messageModal={messageModal}
                    setMessageModal={setMessageModal}
                    messageReceiver={messageReceiver}
                    handleSendNewMessage={handleSendNewMessage}
                />
                <Row className="parent-page">
                    <Col>
                        <CommunityMenu selected="friend" userType={userType} />
                        <hr />
                        <FriendsList
                            friendships={props.getAllFriendshipResponse ? props.getAllFriendshipResponse.friendships : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            handleOpenMessageModal={handleOpenMessageModal}
                        />
                        {/* <SampleUsers /> */}
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    const getAllFriendshipResponse = state.Friendship.getAllFriendships;
    const setMessageResponse = state.Conversation.setMessage;
    console.log('🚀 ~ file: friends.js ~ line 41 ~ mapStateToProps ~ getAllFriendshipResponse', state);
    return { getAllFriendshipResponse, setMessageResponse };
};
export default connect(mapStateToProps, null)(CommunityFriends);
