import React from 'react';
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import moment from 'moment';
import {
    TagWithLabelRender,
    ImpactAreasRender,
    DescriptionRender,
    ImageAndDescriptionRender,
    RequiredItemsRender,
    InfoRender,
    LinkRender,
    BooleanRender,
    KeywordsRender,
} from '../form_template/details-render';
import { LikeButtonRender, GoingButtonRender } from '../form_template/buttons-render';
import PostMapView from './post-map-view';
import * as RoutePath from '../../constants/route-paths';
import { getPostTypeByValue, postTypeFields } from '../../constants/post-types';
const DisplayPost = (props) => {
    const post = props.post;
    const organization = props.organization;
    const fields = postTypeFields[post.postType];
    if (post && post._id && organization) {
        console.log(organization.basicInfo);
        const name = organization.basicInfo && organization.basicInfo.name ? organization.basicInfo.name : 'Organization Name Not Found';
        const profilePicture = organization.basicInfo && organization.basicInfo.profilePicture ? organization.basicInfo.profilePicture : defaultOrganizationProfilePicture;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md="10" className="parent-page">
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
                                <Link to={'/organization/details/' + organization.userId}>
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
                        <hr />
                        {fields.skills && (
                            <>
                                <Row>
                                    <Col>{TagWithLabelRender('', post.skills)}</Col>
                                </Row>
                                <hr />
                            </>
                        )}
                        {fields.startDateTime && fields.endDateTime && (
                            <>
                                <Row>
                                    {post.startDateTime && <Col>{InfoRender('Start Time', moment(post.startDateTime).format('LLLL'))}</Col>}
                                    {post.endDateTime && <Col>{InfoRender('End Time', moment(post.endDateTime).format('LLLL'))}</Col>}
                                </Row>
                                <Row>{post.expectedRequiredHours && <Col>{InfoRender('Expected Required Time', post.expectedRequiredHours + ' Hour')}</Col>}</Row>
                                {post.startDateTime || post.endDateTime ? <hr /> : ''}
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
                                    <Col>{BooleanRender('Top Needed', post.topNeed)}</Col>
                                </Row>
                                <hr />
                            </>
                        )}

                        <Row>
                            <Col>{DescriptionRender('', post.description)}</Col>
                        </Row>
                        <Row>
                            <Col>{KeywordsRender('Keywords', post.keywords)}</Col>
                        </Row>
                        {fields.requiredItems && (
                            <Row>
                                <Col>{RequiredItemsRender(post.requiredItems)}</Col>
                            </Row>
                        )}
                        <Row>
                            <Col>{ImageAndDescriptionRender(post.images)}</Col>
                        </Row>
                        <hr />
                        {fields.address && (
                            <>
                                <Row>
                                    <Col>{InfoRender('Full Address', post.address.fullAddress)}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <PostMapView allPosts={[post]} zoom={16} />
                                    </Col>
                                </Row>
                            </>
                        )}
                        <div style={{ height: 50 }} />
                        <Row>
                            <Col>
                                <LikeButtonRender
                                    onClick={() => {
                                        alert('YET TO DEVELOP');
                                    }}
                                />
                                &nbsp;
                                <GoingButtonRender
                                    onClick={() => {
                                        alert('YET TO DEVELOP');
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
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
