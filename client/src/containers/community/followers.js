import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import FollowersList from '../../components/community/followers-list';
import { getAllFollowers, unfollowUser } from '../../actions/follow-action';
import * as RoutePaths from '../../constants/route-paths';
import { setMessage } from '../../actions/conversation-action';
import MessageModal from '../../components/conversation/message-modal';
import { NotificationManager } from 'react-notifications';
const CommunityFollowers = (props) => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [cards, setCards] = useState({});
    const [messageModal, setMessageModal] = useState(false);
    const [messageReceiver, setMessageReceiver] = useState('');
    useEffect(() => {
        const { success } = props.setMessageResponse;
        if (success) {
            NotificationManager.success('Message sent', 'success');
        } else if (success === false) NotificationManager.error('Message is not sent', 'Failed');
    }, [props.setMessageResponse]);
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
    useEffect(() => {
        const getInitialInfo = (userId) => {
            console.log('Calling API');
            setLoading(true);
            props.dispatch(getAllFollowers(userId));
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
        const { success } = props.getAllFollowersResponse;
        if (success) {
            const followers = props.getAllFollowersResponse.followers;
            for (let i = 0; i < followers.length; i++) {
                cards[followers[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.getAllFollowersResponse]);
    const handleGotoUserDetails = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
    };
    const handleUnfollowUser = (cardId, followerId) => {
        let cards_ = cards;
        cards_[cardId] = false;
        setCards({ ...cards_ });
        props.dispatch(unfollowUser({ followerId: userId, followerId }));
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
                        <CommunityMenu selected="follower" userType={userType} />
                        <hr />
                        <FollowersList
                            followers={props.getAllFollowersResponse ? props.getAllFollowersResponse.followers : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            cards={cards}
                            handleUnfollowUser={handleUnfollowUser}
                            handleOpenMessageModal={handleOpenMessageModal}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    const getAllFollowersResponse = state.Follow.getAllFollowers;
    const setMessageResponse = state.Conversation.setMessage;
    return { getAllFollowersResponse, setMessageResponse };
};
export default connect(mapStateToProps, null)(CommunityFollowers);
