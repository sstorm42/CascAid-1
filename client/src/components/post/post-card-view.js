import React from 'react';
import { Card, CardColumns, Row, Col, Badge } from 'react-bootstrap';
import { defaultPostPicture } from '../../constants/default-images';
import moment from 'moment';
import { interestTypes } from '../../constants/interest-types';
import { getPostTypeByValue } from '../../constants/post-types';
import { ImpactAreasRender, InfoRender } from '../form_template/details-render';
import { LikeButtonRender, InterestedButtonRender, GoingButtonRender, FollowButtonRender, UnfollowUserButtonRender } from '../form_template/buttons-render';

const PostCardView = (props) => {
    const userId = props.userId;
    const allPosts = props.allPosts;
    const followOrganizationButton = props.followOrganizationButton;
    const followingObject = props.followingObject;

    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    let interest = {};

    if (allPosts && allPosts.length > 0) {
        return (
            <CardColumns md="6">
                {allPosts.map((post, i) => {
                    if (post && post._id) {
                        interest = {};
                        let filter = post.interests.filter((interest) => interest.userId === userId);
                        if (filter && filter.length > 0) interest = filter[0];

                        return (
                            <Card className="special-btn special-card" key={i}>
                                <div
                                    className="home-post-image-dark"
                                    onClick={() => {
                                        props.gotoPostDetails(post.postType, post._id);
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={post.images && post.images.length > 0 ? post.images[0].path : defaultPostPicture}
                                        alt="No Image Found"
                                    />
                                    <Badge variant="primary" className="image-text-top-left">
                                        {getPostTypeByValue(post.postType)[0].label}
                                    </Badge>
                                </div>

                                <Card.Body
                                    onClick={() => {
                                        props.gotoPostDetails(post.postType, post._id);
                                    }}
                                >
                                    <Card.Title className="center-aligned">{post.title}</Card.Title>
                                    <h6>{post.organizationName}</h6>
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(post.description)}</small>
                                    </Card.Text>

                                    {ImpactAreasRender('', post.impactAreas)}
                                    <br />
                                    {post.address && InfoRender('', post.address.fullAddress)}
                                    <br />
                                    <small>
                                        {post.startDateTime && (
                                            <Row style={{ marginBottom: 5 }}>
                                                <Col sm={3}>FROM</Col>
                                                <Col sm={9} className="right-align">
                                                    <b>{moment(post.startDateTime).format('MM/DD/y hh:mm:A')}</b>
                                                </Col>
                                            </Row>
                                        )}
                                        {post.endDateTime && (
                                            <Row>
                                                <Col sm={3}>TO</Col>
                                                <Col sm={9} className="right-align">
                                                    <b>{moment(post.endDateTime).format('MM/DD/yy hh:mm:A')}</b>
                                                </Col>
                                            </Row>
                                        )}
                                    </small>
                                </Card.Body>
                                <Card.Footer>
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
                                        {followOrganizationButton && (
                                            <Col>
                                                {followingObject[post.creatorId] ? (
                                                    <UnfollowUserButtonRender
                                                        onClick={() => {
                                                            props.handleUnfollowClick(post.creatorId);
                                                        }}
                                                    />
                                                ) : (
                                                    <FollowButtonRender
                                                        onClick={() => {
                                                            props.handleFollowClick(post.creatorId);
                                                        }}
                                                    />
                                                )}
                                            </Col>
                                        )}
                                    </Row>
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Posts Found</h4>;
};
export default PostCardView;
