import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPublicInfo } from '../../actions/organization-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/organization/organization-details-view';
import { followUser, unfollowUser, checkIfFollower } from '../../actions/follow-action';
// import { NotificationManager } from 'react-notifications';
const OrganizationDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState(false);
    const getInitialInfo = () => {
        const organizationUserId = props.match.params.userId;
        props.dispatch(getPublicInfo(organizationUserId));
        const user = props.auth.user;
        props.dispatch(checkIfFollower(user._id, props.match.params.userId));
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
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <DetailsView
                            organization={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.organization : {}}
                            handleFollowClick={handleFollowClick}
                            handleUnfollowClick={handleUnfollowClick}
                            follows={follows}
                        />
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.Organization.getPublicInfo;
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
