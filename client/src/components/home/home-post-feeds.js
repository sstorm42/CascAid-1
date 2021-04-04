import React, { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col, Image, Button, Modal, Badge } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { FaThumbsUp, FaLocationArrow, FaHeart } from 'react-icons/fa';
import { LikeButtonRender, InterestedButtonRender, GoingButtonRender } from '../form_template/buttons-render';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
const HomePostFeed = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const posts = props.allPosts;
    console.log('🚀 ~ file: home-post-feeds.js ~ line 14 ~ HomePostFeed ~ posts', posts);
    if (posts && posts.length > 0) {
        return (
            <>
                {posts.map((post, i) => {
                    return (
                        <div key={i} className="justify-text post-box">
                            <h6 style={{ color: 'cadetblue' }}>{post.postType === 'general' ? '' : post.postType.toUpperCase()}</h6>
                            <h5
                                className="link-name"
                                onClick={() => {
                                    props.handleGotoPostDetails(post.postType, post._id);
                                }}
                            >
                                {post.title.toUpperCase()}
                            </h5>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col sm="1">
                                            <Avatar src={post.organizationProfilePicture ? post.organizationProfilePicture[0] : defaultOrganizationProfilePicture} rounded={3} size="50" />
                                        </Col>
                                        <Col sm="8">
                                            <h6
                                                className="link-name"
                                                onClick={() => {
                                                    props.handleGotoOrganizationDetails(post.creatorId);
                                                }}
                                            >
                                                {post.organizationName[0]}
                                            </h6>

                                            <small>Created At {moment(post.createdAt).format('LLLL')}</small>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {post.impactAreaNames.map((area, i) => {
                                        return (
                                            <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                {area.label}
                                            </Badge>
                                        );
                                    })}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    {post.skillNames.map((skill, i) => {
                                        return (
                                            <Badge variant="light" className="badge-single-small skill-badge" key={i}>
                                                {skill.label}
                                            </Badge>
                                        );
                                    })}
                                </Col>
                            </Row>
                            <br />
                            <Row
                                onClick={() => {
                                    props.handleGotoPostDetails(post.postType, post._id);
                                }}
                            >
                                {post.images && post.images.length > 0 && (
                                    <Col sm="4" className="home-post-image">
                                        <Image src={post.images[0].path} thumbnail style={{ width: '100%', height: 'auto' }} />
                                        {post.images.length > 1 && <div className="home-post-image-text">{post.images.length - 1} More Images</div>}
                                    </Col>
                                )}
                                <Col className="justify-text">
                                    {post.description && post.description.length > 250 ? (
                                        <>
                                            {post.description.substr(0, 250) + '...'} <a href="#">See More</a>{' '}
                                        </>
                                    ) : (
                                        post.description
                                    )}
                                    {/*  */}
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col>
                                    <LikeButtonRender
                                        onClick={() => {
                                            props.handleLikePost(post._id);
                                        }}
                                    />
                                    &nbsp;
                                    <InterestedButtonRender
                                        onClick={() => {
                                            console.log('handleInterestedPost');
                                            props.handleInterestedPost(post._id);
                                        }}
                                    />
                                    &nbsp;
                                    <GoingButtonRender
                                        onClick={() => {
                                            props.handleGoingPost(post._id);
                                        }}
                                    />
                                    &nbsp;
                                </Col>
                                {/* <Col className="right-align">
                                    <Button variant="outline-primary" size="sm" onClick={handleShow}>
                                        10 Liked
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-info" size="sm" onClick={handleShow}>
                                        100 Interested
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-secondary" size="sm" onClick={handleShow}>
                                        1000 Going
                                    </Button>
                                    &nbsp;
                                </Col> */}
                            </Row>
                        </div>
                    );
                })}
            </>
        );
    } else return <h4>No Posts Found</h4>;
};
export default HomePostFeed;
