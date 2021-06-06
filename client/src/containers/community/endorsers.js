import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import LoadingAnim from '../../components/form_template/loading-anim';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
import EndorsersList from '../../components/community/endorsers-list';
import { getAllEndorsers } from '../../actions/endorsement-action';
import * as RoutePaths from '../../constants/route-paths';
import { setMessage } from '../../actions/conversation-action';
import MessageModal from '../../components/conversation/message-modal';
import { NotificationManager } from 'react-notifications';
const CommunityEndorsers = (props) => {
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
            props.dispatch(getAllEndorsers(userId));
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
        const { success } = props.getAllEndorsersResponse;
        if (success) {
            const endorsers = props.getAllEndorsersResponse.endorsers;
            for (let i = 0; i < endorsers.length; i++) {
                cards[endorsers[i]._id] = true;
            }
            setCards({ ...cards });
        }
    }, [props.getAllEndorsersResponse]);
    const handleGotoUserDetails = (userType, userId) => {
        props.history.push(RoutePaths.userDetailsPage(userType, userId));
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
                        <CommunityMenu selected="endorser" userType={userType} />
                        <hr />
                        <EndorsersList
                            endorsers={props.getAllEndorsersResponse ? props.getAllEndorsersResponse.endorsers : []}
                            userId={userId}
                            handleGotoUserDetails={handleGotoUserDetails}
                            cards={cards}
                            handleOpenMessageModal={handleOpenMessageModal}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
};
const mapStateToProps = (state) => {
    const getAllEndorsersResponse = state.Endorsement.getAllEndorsers;
    const setMessageResponse = state.Conversation.setMessage;
    return { getAllEndorsersResponse, setMessageResponse };
};
export default connect(mapStateToProps, null)(CommunityEndorsers);
