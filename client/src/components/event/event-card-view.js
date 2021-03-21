import React from 'react';
import { Card, CardColumns, Row, Col, Image, Badge } from 'react-bootstrap';
import { defaultEventPicture } from '../../constants/default-images';
import moment from 'moment';
import { getPostTypeByValue } from '../../constants/post-types';
import { ImpactAreasRender, InfoRender } from '../form_template/details-render';
import { LikeButtonRender, GoingButtonRender } from '../form_template/buttons-render';
const EventListView = (props) => {
    const allPosts = props.allPosts;
    console.log('🚀 ~ file: event-card-view.js ~ line 7 ~ EventListView ~ allPosts', allPosts);
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allPosts && allPosts.length > 0) {
        return (
            <CardColumns md="6">
                {allPosts.map((event, i) => {
                    if (event && event._id) {
                        return (
                            <Card
                                className="special-btn special-card"
                                key={i}
                                onClick={() => {
                                    props.gotoPostDetails(event.postType, event._id);
                                }}
                            >
                                <div className="home-post-image-dark">
                                    {/* <Image src={event.images && event.images.length > 0 ? event.images[0].path : defaultEventPicture} style={{ width: '100%', height: 'auto' }} /> */}
                                    <Card.Img variant="top" src={event.images && event.images.length > 0 ? event.images[0].path : defaultEventPicture} alt="No Image Found" />
                                    <Badge variant="primary" className="image-text-top-left">
                                        {getPostTypeByValue(event.postType)[0].label}
                                    </Badge>
                                    {/* <div className="image-text-top-left">{getPostTypeByValue(event.postType)[0].label}</div> */}
                                </div>

                                <Card.Body>
                                    <Card.Title className="center-aligned">{event.title}</Card.Title>
                                    <Card.Text className="justify-text">
                                        <h6>{event.organizationName[0]}</h6>
                                        <small>{descriptionRender(event.description)}</small>
                                        <br />
                                        <br />
                                        {ImpactAreasRender('', event.impactAreaNames)}
                                        <br />
                                        {event.address && InfoRender('', event.address.fullAddress)}
                                        <br />
                                        <small>
                                            <Row style={{ marginBottom: 5 }}>
                                                <Col sm={3}>FROM</Col>
                                                <Col sm={9} className="right-align">
                                                    <b>{moment(event.startDateTime).format('MM/DD/y hh:mm:A')}</b>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={3}>TO</Col>
                                                <Col sm={9} className="right-align">
                                                    <b>{moment(event.endDateTime).format('MM/DD/yy hh:mm:A')}</b>
                                                </Col>
                                            </Row>
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <LikeButtonRender /> &nbsp;
                                    <GoingButtonRender />
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Events Found</h4>;
};
export default EventListView;
