import React from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { getPostTypeName } from '../../constants/post-types';
import { Link } from 'react-router-dom';
import * as RoutePath from '../../constants/route-paths';
import { ImpactAreasRender, InfoRender } from '../../components/form_template/details-render';
import { LikeButtonRender, InterestedButtonRender, GoingButtonRender } from '../../components/form_template/buttons-render';
const CalendarPostModal = (props) => {
    const post = props.post;
    const postModal = props.postModal;
    const setPostModal = props.setPostModal;
    if (post && post._id)
        return (
            <Modal
                size="lg"
                style={{ zIndex: 10000 }}
                show={postModal}
                onHide={() => {
                    setPostModal(false);
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
        );
    else
        return (
            <Modal
                style={{ zIndex: 10000, width: '1000px' }}
                show={postModal}
                onHide={() => {
                    setPostModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Post Not Found</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="special-btn">
                        <Col>Sorry, The Post You Are Looking For Is Not Available.</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        );
};
export default CalendarPostModal;
