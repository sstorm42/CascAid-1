import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import EventListView from '../../components/event/event-card-view';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllPostsByFilter } from '../../actions/post-action';
import EventMapView from '../../components/event/event-map-view';
import SearchMenu from '../../components/search/search-menu';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import Select from 'react-select';
import Pagination from 'react-js-pagination';
import { likePost, cancelLikePost, interestedPost, cancelInterestedPost, goingPost, cancelGoingPost, changePostInterest } from '../../actions/post-action';
import { defaultCurrentLocation } from '../../constants/default-user-information';
import FilterEvent from '../../components/search/filter-event';
import { allSearchablePostTypes } from '../../constants/post-types';
import { postDetailsPage } from '../../constants/route-paths';
import { getAllFollowings, followUser, unfollowUser } from '../../actions/follow-action';

const SearchCommunityActivity = (props) => {
    const [currentLocation, setCurrentLocation] = useState(defaultCurrentLocation);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [userId, setUserId] = useState('');
    const [followingObject, setFollowingObject] = useState({});
    const [filter, setFilter] = useState({
        title: '',
        impactAreas: [],
        postTypes: allSearchablePostTypes,
        // startDate: new Date(),
        // endDate: new Date(),
        startDate: '',
        endDate: '',
        fullAddress: '',
        keyword: '',
        topNeed: false,
    });
    const resetFilter = () => {
        setFilter({
            title: '',
            impactAreas: [],
            postTypes: allSearchablePostTypes,
            // startDate: new Date(),
            // endDate: new Date(),
            startDate: '',
            endDate: '',
            fullAddress: '',
            keyword: '',
            topNeed: false,
        });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            if (position) {
                const coords = position.coords;
                setCurrentLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            }
        });
    }, []);
    const changeFilter = (key, value) => {
        console.log('🚀 ~ file: search-event.js ~ line 49 ~ changeFilter ~ key, value', key, value);
        let filter_ = filter;
        filter[key] = value;

        setFilter({ ...filter_ });
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllPostsByFilter(filter));
        setLoading(false);
        setActivePage(1);
    };
    const gotoPostDetails = (postType, postId) => {
        props.history.push(postDetailsPage(postType, postId));
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getAllGlobalImpactAreas());
            props.dispatch(getAllFollowings(user._id));
            setLoading(false);
        };
        getInitialInfo();
    }, []);
    useEffect(() => {
        const { success } = props.getAllFollowingsResponse;
        if (success) {
            const cards = {};

            const followings = props.getAllFollowingsResponse.followings;
            for (let i = 0; i < followings.length; i++) {
                cards[followings[i].followingId] = true;
            }
            setFollowingObject(cards);
            console.log('🚀 ~ file: search-community-activity.js ~ line 95 ~ useEffect ~ cards', cards);
        }
    }, [props.getAllFollowingsResponse]);
    const handleLikePost = (postId) => {
        props.dispatch(likePost(postId));
        props.dispatch(changePostInterest(postId, userId, 'like'));
    };
    const handleCancelLikePost = (postId) => {
        props.dispatch(cancelLikePost(postId));
        props.dispatch(changePostInterest(postId, userId, 'unlike'));
    };

    const handleInterestedPost = (postId) => {
        props.dispatch(interestedPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'interested'));
    };
    const handleCancelInterestedPost = (postId) => {
        console.log('🚀 ~ file: home.js ~ line 46 ~ handleCancelInterestedPost ~ postId', postId);
        props.dispatch(cancelInterestedPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'uninterested'));
    };

    const handleGoingPost = (postId) => {
        props.dispatch(goingPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'going'));
    };
    const handleCancelGoingPost = (postId) => {
        props.dispatch(cancelGoingPost(postId));
        props.dispatch(changePostInterest(postId, userId, 'ungoing'));
    };
    const handleFollowClick = (followingId) => {
        setLoading(true);
        props.dispatch(followUser({ followerId: userId, followingId }));
        const followings_ = followingObject;
        followings_[followingId] = true;
        setFollowingObject({ ...followings_ });
        setLoading(false);
    };
    const handleUnfollowClick = (followingId) => {
        setLoading(true);
        props.dispatch(unfollowUser({ followerId: userId, followingId }));
        const followings_ = followingObject;
        followings_[followingId] = false;
        setFollowingObject({ ...followings_ });
        setLoading(false);
    };
    if (loading) return <LoadingAnim />;
    return (
        <Container>
            <Row className="parent-page">
                <Col lg={4}>
                    <SearchMenu selected="event" />
                    <hr />
                    <FilterEvent
                        changeFilter={changeFilter}
                        resetFilter={resetFilter}
                        handleOnApplyFilter={handleOnApplyFilter}
                        filter={filter}
                        organizationTypes={props.getOrganizationTypeResponse?.success ? props.getOrganizationTypeResponse.organizationTypes : []}
                        impactAreas={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []}
                    />
                </Col>
                <Col lg={8}>
                    <Nav
                        variant="pills"
                        activeKey={viewType}
                        onSelect={(eventKey) => {
                            setViewType(eventKey);
                        }}
                        size="sm"
                    >
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="list" title="list">
                                List
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="map" title="map">
                                Map
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    {viewType === 'list' && (
                        <>
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={30}
                                // totalItemsCount={props.getAllEventsResponse.success ? props.getAllEventsResponse.allEvents.length : 0}
                                totalItemsCount={props.getAllPostsResponse.success ? props.getAllPostsResponse.allPosts.length : 0}
                                pageRangeDisplayed={5}
                                onChange={(page) => {
                                    setActivePage(page);
                                }}
                            />
                            <EventListView
                                // allEvents={props.getAllEventsResponse.success ? props.getAllEventsResponse.allEvents.slice((activePage - 1) * 30, activePage * 30 - 1) : []}
                                allPosts={
                                    props.getAllPostsResponse.success
                                        ? props.getAllPostsResponse.allPosts.slice((activePage - 1) * 30, activePage * 30 - 1)
                                        : []
                                }
                                gotoPostDetails={gotoPostDetails}
                                userId={userId}
                                handleLikePost={handleLikePost}
                                handleCancelLikePost={handleCancelLikePost}
                                handleInterestedPost={handleInterestedPost}
                                handleCancelInterestedPost={handleCancelInterestedPost}
                                handleGoingPost={handleGoingPost}
                                handleCancelGoingPost={handleCancelGoingPost}
                                followingObject={followingObject}
                                handleFollowClick={handleFollowClick}
                                handleUnfollowClick={handleUnfollowClick}
                                followOrganizationButton={true}
                            />
                        </>
                    )}
                    {viewType === 'map' && (
                        <EventMapView
                            allPosts={props.getAllPostsResponse.success ? props.getAllPostsResponse.allPosts : []}
                            zoom={6}
                            currentLocation={currentLocation}
                            gotoPostDetails={gotoPostDetails}
                            userId={userId}
                            handleLikePost={handleLikePost}
                            handleCancelLikePost={handleCancelLikePost}
                            handleInterestedPost={handleInterestedPost}
                            handleCancelInterestedPost={handleCancelInterestedPost}
                            handleGoingPost={handleGoingPost}
                            handleCancelGoingPost={handleCancelGoingPost}
                            followingObject={followingObject}
                            handleFollowClick={handleFollowClick}
                            handleUnfollowClick={handleUnfollowClick}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getAllPostsResponse = state.Post.getAllPosts;
    const getAllFollowingsResponse = state.Follow.getAllFollowings;
    const getFollowResponse = state.Follow.followUser;
    const getUnfollowResponse = state.Follow.unfollowUser;
    return {
        getImpactAreaResponse,
        getAllPostsResponse,
        getAllFollowingsResponse,
        getFollowResponse,
        getUnfollowResponse,
    };
};
export default connect(mapStateToProps, null)(SearchCommunityActivity);
