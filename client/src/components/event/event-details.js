import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import Avatar from 'react-avatar';
import moment from 'moment';
import { TagWithLabelRender, DescriptionRender, ImageAndDescriptionRender, InfoRender } from '../form_template/details-render';
import { LikeButtonRender, GoingButtonRender } from '../form_template/buttons-render';
const DisplayEvent = (props) => {
    const event = props.event;
    const organization = props.organization;
    if (event && organization) {
        console.log(organization.basicInfo);
        const name = organization.basicInfo && organization.basicInfo.name ? organization.basicInfo.name : 'Organization Name Not Found';
        const profilePicture = organization.basicInfo && organization.basicInfo.profilePicture ? organization.basicInfo.profilePicture : defaultOrganizationProfilePicture;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md="10" className="parent-page">
                        <Row>
                            <Col>
                                <h4>{event.title}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="1">
                                <Avatar src={profilePicture} round size="50" />
                            </Col>
                            <Col sm="8">
                                <h6>{name}</h6>
                                <small>Created At {moment(event.createdAt).format('LLLL')}</small>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>{TagWithLabelRender('', event.impactAreas)}</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>{InfoRender('Start Time', moment(event.startDateTime).format('LLLL'))}</Col>
                            <Col>{InfoRender('End Time', moment(event.endDateTime).format('LLLL'))}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>{DescriptionRender('', event.description)}</Col>
                        </Row>
                        <Row>
                            <Col>{ImageAndDescriptionRender(event.images)}</Col>
                        </Row>
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
                        <h4>Event is not available</h4>
                    </Col>
                </Row>
            </Container>
        );
};
export default DisplayEvent;
