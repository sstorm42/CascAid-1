import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUserPublicInfo } from '../../actions/user-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/organization/organization-details-view';
import { followUser, unfollowUser, checkIfFollower } from '../../actions/follow-action';
import { endorseUser, cancelEndorseUser, checkIfEndorses } from '../../actions/endorsement-action';
import SideSubMenu from '../../components/organization/organization-sub-menu';

const OrganizationDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState(false);
    const [endorses, setEndorses] = useState(false);
    const getInitialInfo = () => {
        const userId = props.match.params.userId;
        props.dispatch(getUserPublicInfo(userId));
        const user = props.auth.user;
        props.dispatch(checkIfFollower(user._id, userId));
        props.dispatch(checkIfEndorses(user._id, userId));
    };
    useEffect(() => {
        alert('DETAILS');
        getInitialInfo();
    }, [props.auth, props.match.params.userId]);
    useEffect(() => {
        const { success } = props.getCheckIfFollowerResponse;
        if (success) {
            setFollows(props.getCheckIfFollowerResponse.follows);
        }
    }, [props.getCheckIfFollowerResponse]);
    useEffect(() => {
        const { success } = props.getCheckIfEndorsesResponse;
        if (success) {
            setEndorses(props.getCheckIfEndorsesResponse.endorses);
        }
    }, [props.getCheckIfEndorsesResponse]);

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
        } else if (success === false) {
        }
    }, [props.getFollowResponse]);
    useEffect(() => {
        const { success } = props.getUnfollowResponse;
        if (success) {
            setFollows(false);
        } else if (success === false) {
        }
    }, [props.getUnfollowResponse]);

    const handleEndorseClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(endorseUser({ endorserId: user._id, endorseeId: props.match.params.userId }));
        setLoading(false);
    };
    const handleCancelEndorseClick = () => {
        setLoading(true);
        const user = props.auth.user;
        props.dispatch(cancelEndorseUser({ endorserId: user._id, endorseeId: props.match.params.userId }));
        setLoading(false);
    };
    useEffect(() => {
        const { success } = props.getEndorseResponse;
        if (success) {
            setEndorses(true);
        } else if (success === false) {
        }
    }, [props.getEndorseResponse]);
    useEffect(() => {
        const { success } = props.getCancelEndorseResponse;
        if (success) {
            setEndorses(false);
        } else if (success === false) {
        }
    }, [props.getCancelEndorseResponse]);
    const gotoPage = (url) => {
        props.history.push(url);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <SideSubMenu
                activePage={props.activePage ? props.activePage : ''}
                organization={props.getPublicInfoResponse && props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                handleFollowClick={handleFollowClick}
                handleUnfollowClick={handleUnfollowClick}
                follows={follows}
                handleEndorseClick={handleEndorseClick}
                handleCancelEndorseClick={handleCancelEndorseClick}
                endorses={endorses}
                gotoPage={gotoPage}
            />
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.User.getUserPublicInfo;
    const getCheckIfFollowerResponse = state.Follow.checkIfFollower;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;

    const getCheckIfEndorsesResponse = state.Endorsement.checkIfEndorses;
    const getEndorseResponse = state.Endorsement.endorseUser;
    const getCancelEndorseResponse = state.Endorsement.cancelEndorseUser;
    return {
        getPublicInfoResponse,
        getCheckIfFollowerResponse,
        getFollowResponse,
        getUnfollowResponse,
        getCheckIfEndorsesResponse,
        getEndorseResponse,
        getCancelEndorseResponse,
    };
};
export default connect(mapStateToProps, null)(OrganizationDetails);
