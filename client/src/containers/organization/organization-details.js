import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUserPublicInfo } from '../../actions/user-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/organization/organization-details-view';
import { followUser, unfollowUser, checkIfFollower } from '../../actions/follow-action';
import SideSubMenu from '../../components/organization/organization-sub-menu';
// import { NotificationManager } from 'react-notifications';
const OrganizationDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState(false);
    const getInitialInfo = () => {
        const userId = props.match.params.userId;
        props.dispatch(getUserPublicInfo(userId));
        const user = props.auth.user;
        props.dispatch(checkIfFollower(user._id, userId));
    };
    useEffect(() => {
        getInitialInfo();
    }, [props.auth, props.match.params.userId]);
    useEffect(() => {
        const success = props.getCheckIfFollowerResponse;
        if (success) {
            setFollows(props.getCheckIfFollowerResponse.follows);
        }
    }, [props.getCheckIfFollowerResponse]);
    const handleFollowClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(followUser({ followerId: user._id, followingId: props.match.params.userId }));
        setLoading(false);
    };
    const handleUnfollowClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(unfollowUser({ followerId: user._id, followingId: props.match.params.userId }));
        setLoading(false);
    };
    useEffect(() => {
        const { success } = props.getFollowResponse;
        if (success) {
            setFollows(true);
            // NotificationManager.success('You are following', 'success');
        } else if (success === false) {
            // NotificationManager.success('Server connection error', 'failed');
        }
    }, [props.getFollowResponse]);
    useEffect(() => {
        const { success } = props.getUnfollowResponse;

        if (success) {
            setFollows(false);
            // NotificationManager.success('You are unfollowing', 'success');
        } else if (success === false) {
            // NotificationManager.success('Server connection error', 'failed');
        }
    }, [props.getUnfollowResponse]);
    const gotoPage = (url) => {
        props.history.push(url);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col className="right-align" sm="2">
                                <SideSubMenu
                                    activePage="About"
                                    organization={props.getPublicInfoResponse && props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                                    handleFollowClick={handleFollowClick}
                                    handleUnfollowClick={handleUnfollowClick}
                                    follows={follows}
                                    gotoPage={gotoPage}
                                />
                            </Col>
                            <Col sm="9" className="left-border">
                                <DetailsView
                                    organization={props.getPublicInfoResponse && props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                                    memberships={
                                        props.getPublicInfoResponse && props.getPublicInfoResponse.success ? props.getPublicInfoResponse.memberships : []
                                    }
                                    handleFollowClick={handleFollowClick}
                                    handleUnfollowClick={handleUnfollowClick}
                                    follows={follows}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.User.getUserPublicInfo;
    const getCheckIfFollowerResponse = state.Follow.checkIfFollower;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;
    return {
        getPublicInfoResponse,
        getCheckIfFollowerResponse,
        getFollowResponse,
        getUnfollowResponse,
    };
};
export default connect(mapStateToProps, null)(OrganizationDetails);
