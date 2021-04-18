import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import EventListView from '../../components/event/event-card-view';
import { getUserPublicInfo } from '../../actions/user-action';
import { getAllPostsByFilter } from '../../actions/post-action';
import { followUser, unfollowUser, checkIfFollower } from '../../actions/follow-action';
import SideSubMenu from '../../components/organization/organization-sub-menu';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import PostTypeMenu from '../../components/organization/organization-post-menu';
import { postDetailsPage } from '../../constants/route-paths';
const SearchEvent = (props) => {
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState(false);

    const gotoPostDetails = (postType, postId) => {
        props.history.push(postDetailsPage(postType, postId));
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            console.log('Came here');
            const userId = props.match.params.userId;
            props.dispatch(getUserPublicInfo(userId));
            const user = props.auth.user;
            const postType = props.match.params.postType;
            props.dispatch(checkIfFollower(user._id, props.match.params.userId));
            setLoading(false);
        };
        getInitialInfo();
    }, []);
    useEffect(() => {
        setLoading(true);
        const userId = props.match.params.userId;
        const postType = props.match.params.postType;
        props.dispatch(getAllPostsByFilter({ creatorId: userId, postTypes: [{ value: postType }] }));
        setLoading(false);
    }, [props.match.params.postType]);
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
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col className="right-align" sm="2">
                            <SideSubMenu
                                organization={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.user : {}}
                                handleFollowClick={handleFollowClick}
                                handleUnfollowClick={handleUnfollowClick}
                                follows={follows}
                                gotoPage={gotoPage}
                            />
                        </Col>
                        <Col sm="9" className="left-border">
                            <PostTypeMenu selected={props.match.params.postType} userId={props.match.params.userId} />
                            <hr />
                            <EventListView
                                allPosts={props.getAllPostsResponse.success ? props.getAllPostsResponse.allPosts : []}
                                gotoPostDetails={gotoPostDetails}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const getAllPostsResponse = state.Post.getAllPosts;
    console.log('🚀 ~ file: organization-post-list.js ~ line 95 ~ mapStateToProps ~ getAllPostsResponse', state);
    const getPublicInfoResponse = state.User.getUserPublicInfo;
    const getCheckIfFollowerResponse = state.Follow.checkIfFollower;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;
    return {
        getPublicInfoResponse,
        getCheckIfFollowerResponse,
        getFollowResponse,
        getUnfollowResponse,
        getAllPostsResponse,
    };
};
export default connect(mapStateToProps, null)(SearchEvent);
