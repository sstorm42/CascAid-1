import React, { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col, Image, Button, Modal, Badge } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { interestTypes } from '../../constants/interest-types';
import { LikeButtonRender, InterestedButtonRender, GoingButtonRender } from '../form_template/buttons-render';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
const HomePostFeed = (props) => {
    const userId = props.userId;
    const [show, setShow] = useState(false);

    const posts = props.allPosts;
    let interest = {};

    if (posts && posts.length > 0) {
        return (
            <>
                {posts.map((post, i) => {
                    interest = {};
                    let filter = post.interests.filter((interest) => interest.userId === userId);
                    if (filter && filter.length > 0) interest = filter[0];
                    let liked = post.interests.filter((interest) => interest.liked).length;
                    let interested = post.interests.filter((interest) => interest.interested).length;
                    let going = post.interests.filter((interest) => interest.going).length;

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
                                            <Avatar
                                                src={post.organizationProfilePicture ? post.organizationProfilePicture[0] : defaultOrganizationProfilePicture}
                                                rounded={3}
                                                size="50"
                                            />
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
                                    {interestTypes[post.postType].like ? (
                                        interest.liked ? (
                                            <LikeButtonRender
                                                complete={true}
                                                onClick={() => {
                                                    props.handleCancelLikePost(post._id);
                                                }}
                                            />
                                        ) : (
                                            <LikeButtonRender
                                                complete={false}
                                                onClick={() => {
                                                    props.handleLikePost(post._id);
                                                }}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    &nbsp;
                                    {interestTypes[post.postType].interested ? (
                                        interest.interested ? (
                                            <InterestedButtonRender
                                                complete={true}
                                                onClick={() => {
                                                    props.handleCancelInterestedPost(post._id);
                                                }}
                                            />
                                        ) : (
                                            <InterestedButtonRender
                                                complete={false}
                                                onClick={() => {
                                                    props.handleInterestedPost(post._id);
                                                }}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    &nbsp;
                                    {interestTypes[post.postType].going ? (
                                        interest.going ? (
                                            <GoingButtonRender
                                                complete={true}
                                                onClick={() => {
                                                    props.handleCancelGoingPost(post._id);
                                                }}
                                            />
                                        ) : (
                                            <GoingButtonRender
                                                complete={false}
                                                onClick={() => {
                                                    props.handleGoingPost(post._id);
                                                }}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    &nbsp;
                                </Col>
                                <Col className="right-align">
                                    {interestTypes[post.postType].like && liked > 0 && (
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => {
                                                props.handleClickCommittedButtons(post._id, 'liked');
                                            }}
                                        >
                                            {liked} Liked
                                        </Button>
                                    )}
                                    &nbsp;
                                    {interestTypes[post.postType].interested && interested > 0 && (
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => {
                                                props.handleClickCommittedButtons(post._id, 'interested');
                                            }}
                                        >
                                            {interested} Interested
                                        </Button>
                                    )}
                                    &nbsp;
                                    {interestTypes[post.postType].going && going > 0 && (
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => {
                                                props.handleClickCommittedButtons(post._id, 'going');
                                            }}
                                        >
                                            {going} Going
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </>
        );
    } else return <h4>No Posts Found</h4>;
};
export default HomePostFeed;
