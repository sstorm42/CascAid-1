import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Badge, Button } from 'react-bootstrap';
import { FiHelpCircle } from 'react-icons/fi';
import { Calendar, momentLocalizer, dateFnsLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import events from './posts';
import { Link } from 'react-router-dom';
import * as RoutePath from '../../constants/route-paths';
import { connect } from 'react-redux';
import { ImpactAreasRender, InfoRender } from '../../components/form_template/details-render';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getColorByPostType, getPostTypeName, calenderPostTypeWithColor } from '../../constants/post-types';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import CalenderFilter from '../../components/post/calender-filter';
import {
    LikeButtonRender,
    InterestedButtonRender,
    GoingButtonRender,
    FollowButtonRender,
    UnfollowUserButtonRender,
} from '../../components/form_template/buttons-render';
import { postDetailsPage, userDetailsPage } from '../../constants/route-paths';
import {
    cancelGoingPost,
    cancelInterestedPost,
    cancelLikePost,
    changePostInterest,
    getHomeFeed,
    goingPost,
    interestedPost,
    likePost,
} from '../../actions/post-action';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};

const allViews = Object.keys(Views).map((k) => Views[k]);

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
function Event({ event }) {
    return (
        <span
        // onClick={() => {
        //     alert(event._id);
        // }}
        >
            <strong>{event.title}</strong>
            {/* {event.desc && ':  ' + event.desc} */}
        </span>
    );
}

function EventAgenda({ event }) {
    return (
        <span>
            <em style={{ color: 'white' }}>{event.title}</em>
            {/* <p>{event.desc}</p> */}
        </span>
    );
}
const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'white',
        },
    });
const customSlotPropGetter = (date) => {
    if (date.getDate() === 7 || date.getDate() === 15)
        return {
            className: 'special-day',
        };
    else return {};
};

const PostCalenderView = (props) => {
    const [loading, setLoading] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [postModal, setPostModal] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});
    const handlePostModal = (modalFlag) => {
        setPostModal(modalFlag);
    };
    const handleChangePost = (post) => {
        setPost(post);
    };
    const setDates = () => {
        posts.map((post) => {
            return posts.push({
                start: new Date(post.startDateTime),
                end: new Date(post.endDateTime),
                title: `${post.title})`,
            });
        });
        return posts;
    };

    const eventStyleGetter = (post, start, end, isSelected) => {
        var style = {
            backgroundColor: getColorByPostType(post.postType),
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            borderRadius: '3px',
            // border: '0px',
            // display: 'block',
        };
        return {
            style: style,
        };
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            setUserId(user._id);
            props.dispatch(getHomeFeed());
            setLoading(false);
        };
        getInitialInfo();
    }, []);
    const handleGotoPostDetails = (postType, postId) => {
        props.history.push(postDetailsPage(postType, postId));
    };
    const handleGotoOrganizationDetails = (userId) => {
        props.history.push(userDetailsPage('organization', userId));
    };
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
    useEffect(() => {
        const { success } = props.homeFeedResponse;

        if (success) {
            const allPosts = props.homeFeedResponse.allPosts;
            if (allPosts && allPosts.length > 0) {
                const allPosts_ = allPosts
                    .filter((post) => post.startDateTime && post.endDateTime)
                    .map((p) => {
                        return { ...p, id: p._id.toString(), startDateTime: new Date(p.startDateTime), endDateTime: new Date(p.endDateTime) };
                    });
                console.log('🚀 ~ file: post-calender-view.js ~ line 144 ~ useEffect ~ props.homeFeedResponse', allPosts_);
                setPosts(allPosts_);
            }
        }
    }, [props.homeFeedResponse]);
    return (
        <Container className="parent-page">
            <Modal
                style={{ zIndex: 10000, width: '1000px' }}
                show={infoModal}
                onHide={() => {
                    setInfoModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Calender Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Posts are associated with different colors for different types. Colors and Post types are mentioned here.
                        {calenderPostTypeWithColor.map((postType, i) => {
                            return (
                                <li key={i} className="calender-help-list-item" style={{ backgroundColor: getColorByPostType(postType.name) }}>
                                    {postType.label}
                                </li>
                            );
                        })}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        size="sm"
                        onClick={() => {
                            setInfoModal(false);
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                style={{ zIndex: 10000, width: '1000px' }}
                show={postModal}
                onHide={() => {
                    handlePostModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{getPostTypeName(post.postType)} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="special-btn">
                        <Col>
                            <Link to={RoutePath.postDetailsPage(post.postType, post._id)}>
                                <h5 style={{ color: 'cadetblue' }}>{post.title}</h5>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{ImpactAreasRender('', post.impactAreas)}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>{post.description}</small>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <LikeButtonRender />
                    &nbsp;
                    <InterestedButtonRender />
                    &nbsp;
                    <GoingButtonRender />
                </Modal.Footer>
            </Modal>
            <Row>
                <Col className="right-align">
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                            setInfoModal(true);
                        }}
                    >
                        <FiHelpCircle />
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row>
                {/* <Col md={4}>
                    <CalenderFilter />
                </Col> */}
                <Col>
                    <Calendar
                        onShowMore={(events, date) => console.log(date)}
                        localizer={localizer}
                        events={posts}
                        startAccessor="startDateTime"
                        endAccessor="endDateTime"
                        style={{ height: 700 }}
                        views={allViews}
                        components={{
                            event: Event,
                            agenda: {
                                event: EventAgenda,
                            },
                            timeSlotWrapper: ColoredDateCellWrapper,
                        }}
                        onSelectEvent={(e) => {
                            console.log(e);
                            handleChangePost(e);
                            handlePostModal(true);
                        }}
                        eventPropGetter={eventStyleGetter}
                    />
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const homeFeedResponse = state.Post.homeFeed;
    return { homeFeedResponse };
};
export default connect(mapStateToProps, null)(PostCalenderView);
