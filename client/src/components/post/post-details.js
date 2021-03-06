import React from 'react';
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '@Constants/default-images';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { interestTypes } from '@Constants/interest-types';
import moment from 'moment';

import {
    TagWithLabelRender,
    SkillsRender,
    ImpactAreasRender,
    DescriptionRender,
    ImageAndDescriptionRender,
    RequiredItemsRender,
    InfoRender,
    LinkRender,
    BooleanRender,
    KeywordsRender,
} from '../form_template/details-render';
import {
    LikeButtonRender,
    GoingButtonRender,
    InterestedButtonRender,
    AddToSchedulerButtonRender,
    RemoveFromSchedulerButtonRender,
    FacebookShareButtonRender,
    LinkedInShareButtonRender,
    TwitterShareButtonRender,
    MessengerShareButtonRender,
    EmailShareButtonRender,
} from '../form_template/buttons-render';
import PostMapView from './post-map-view';
import * as RoutePath from '@Constants/route-paths';
import { getPostTypeByValue, postTypeFields } from '@Constants/post-types';
const DisplayPost = (props) => {
    const post = props.post;
    const url = props.url;

    const userId = props.userId;
    const fields = postTypeFields[post.postType];
    const getCheckIfPostAddedToSchedulerResponse = props.getCheckIfPostAddedToSchedulerResponse;
    const handleAddPostToScheduler = props.handleAddPostToScheduler;
    const handleRemovePostFromScheduler = props.handleRemovePostFromScheduler;
    if (post && post._id) {
        const name = post.organizationName ? post.organizationName : 'Organization Name Not Found';
        const profilePicture = post.organizationProfilePicture ? post.organizationProfilePicture : defaultOrganizationProfilePicture;
        // const interests = post.interests;
        const committed = post.interests.filter((i) => i.userId === userId)[0];
        console.log('🚀 ~ file: post-details.js ~ line 32 ~ DisplayPost ~ committed', committed);
        let liked = post.interests.filter((interest) => interest.liked).length;
        let interested = post.interests.filter((interest) => interest.interested).length;
        let going = post.interests.filter((interest) => interest.going).length;
        let mapView = false;
        if (fields.address && post.address && post.address.latitude && post.address.longitude) mapView = true;
        let follows = false;
        let postIsAddedToScheduler = false;
        if (getCheckIfPostAddedToSchedulerResponse && getCheckIfPostAddedToSchedulerResponse.success) {
            follows = getCheckIfPostAddedToSchedulerResponse.follows;
            postIsAddedToScheduler = getCheckIfPostAddedToSchedulerResponse.isAdded;
        }
        console.log('🚀 ~ file: post-details.js ~ line 51 ~ DisplayPost ~ follows', follows, postIsAddedToScheduler);
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        {post.creatorId === userId && (
                            <Row>
                                <Col>
                                    <Button
                                        size="sm"
                                        variant="outline-info"
                                        onClick={() => {
                                            props.handleGotoManagePosts();
                                        }}
                                    >
                                        Manage Posts
                                    </Button>
                                    <hr />
                                </Col>
                            </Row>
                        )}
                        {post.postType !== 'general' && (
                            <Row>
                                <Col>
                                    <h4>
                                        <Badge variant="dark">{getPostTypeByValue(post.postType)[0].label}</Badge>
                                    </h4>
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col>
                                <h4>{post.title}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="1">
                                <Avatar src={profilePicture} round size="50" />
                            </Col>
                            <Col sm="8">
                                <Link to={'/organization/details/' + post.creatorId}>
                                    {' '}
                                    <h6>{name}</h6>
                                </Link>
                                <small>Created At {moment(post.createdAt).format('LLLL')}</small>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>{ImpactAreasRender('', post.impactAreas)}</Col>
                        </Row>

                        {fields.skills && (
                            <>
                                <Row>
                                    <Col>{SkillsRender('', post.skills)}</Col>
                                </Row>
                            </>
                        )}
                        {fields.startDateTime && fields.endDateTime && (
                            <>
                                <Row>
                                    {post.startDateTime && <Col>{InfoRender('Start Time', moment(post.startDateTime).format('LLLL'))}</Col>}
                                    {post.endDateTime && <Col>{InfoRender('End Time', moment(post.endDateTime).format('LLLL'))}</Col>}
                                </Row>
                                <Row>
                                    {post.expectedRequiredHours && <Col>{InfoRender('Expected Required Time', post.expectedRequiredHours + ' Hour')}</Col>}
                                </Row>
                                {/* {post.startDateTime || post.endDateTime ? <hr /> : ''} */}
                            </>
                        )}
                        {fields.petitionLink && post.petitionLink && (
                            <>
                                <Row>
                                    <Col>{LinkRender('Petition Link', post.petitionLink)}</Col>
                                </Row>
                                <hr />
                            </>
                        )}
                        {fields.topNeed && post.topNeed && (
                            <>
                                <Row>
                                    <Col>{BooleanRender('Top Need', post.topNeed)}</Col>
                                </Row>
                                <hr />
                            </>
                        )}

                        <Row>
                            {mapView && <Col md={4}>{<PostMapView allPosts={[post]} zoom={16} />}</Col>}
                            <Col>
                                {DescriptionRender('', post.description)}
                                <hr />

                                {KeywordsRender('Keywords', post.keywords)}
                            </Col>
                            <hr />
                        </Row>

                        {fields.requiredItems && (
                            <Row>
                                <Col>{RequiredItemsRender(post.requiredItems)}</Col>
                            </Row>
                        )}
                        <Row>
                            <Col>{ImageAndDescriptionRender(post.images)}</Col>
                            <hr />
                        </Row>
                        {fields.postURL && post.postURL && (
                            <Row>
                                <Col>{InfoRender('URL', post.postURL)}</Col>
                            </Row>
                        )}
                        {fields.contact && post.contact && (
                            <Row>
                                <Col>{InfoRender('Contact', post.contact)}</Col>
                            </Row>
                        )}
                        <div style={{ height: 50 }} />
                        <Row>
                            <Col>
                                {interestTypes[post.postType].like ? (
                                    committed && committed.liked ? (
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
                                    committed && committed.interested ? (
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
                                    committed && committed.going ? (
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
                                {fields.addable && !follows ? (
                                    postIsAddedToScheduler ? (
                                        <RemoveFromSchedulerButtonRender
                                            hover_title="Remove From My Calendar"
                                            onClick={() => {
                                                handleRemovePostFromScheduler();
                                            }}
                                        />
                                    ) : (
                                        <AddToSchedulerButtonRender
                                            hover_title="Add To My Calendar"
                                            onClick={() => {
                                                handleAddPostToScheduler();
                                            }}
                                        />
                                    )
                                ) : (
                                    <></>
                                )}
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
                        <hr />
                        {url && (
                            <Row>
                                <Col sm={2}>
                                    <label>SHARE</label>
                                </Col>
                                <Col sm={10}>
                                    <FacebookShareButtonRender shareUrl={url} quote={post.title} />
                                    &nbsp;
                                    <MessengerShareButtonRender shareUrl={url} quote={post.title} />
                                    &nbsp;
                                    <LinkedInShareButtonRender shareUrl={url} quote={post.title} />
                                    &nbsp;
                                    <TwitterShareButtonRender shareUrl={url} quote={post.title} />
                                    &nbsp;
                                    <EmailShareButtonRender shareUrl={url} quote={post.title} />
                                    &nbsp;
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    } else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <h4>Post is not available</h4>
                    </Col>
                </Row>
            </Container>
        );
};
export default DisplayPost;
