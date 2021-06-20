import React, { useState } from 'react';
import { Container, Row, Col, Modal, Image, Button } from 'react-bootstrap';
import { GrDocumentDownload } from 'react-icons/gr';
import moment from 'moment';
export const PostImageModalRender = (props) => {
    const imageDetailsModal = props.imageDetailsModal;
    const image = props.image;
    if (image && image.images && image.images.path) {
        const src = image.images.path;
        const description = image.images.description;
        const postTitle = image.title;
        const postId = image._id;
        const postType = image.postType;
        const time = image.images.createdAt;
        return (
            <Modal
                show={imageDetailsModal}
                size="xl"
                style={{ zIndex: 10000 }}
                onHide={() => {
                    props.setImageDetailsModal(false);
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Image Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={8}>
                            <Image src={src} width={'100%'} />
                        </Col>
                        <Col sm={4}>
                            <h5
                                className="link-name"
                                onClick={() => {
                                    props.gotoPostDetails(postType, postId);
                                }}
                            >
                                {postTitle}
                            </h5>
                            <small>{moment(time).format('LLLL')}</small>
                            {/* <h6 className="link-name">{organizationInfo.name}</h6> */}
                            <hr />
                            <p className="justify-text">{description}</p>
                            <hr />
                            {/* <Button size="sm" variant="outline-dark">
                            <GrDocumentDownload />
                        </Button> */}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    } else return <></>;
};

export const MessageImageModalRender = (props) => {
    const image = props.image;
    const imageModal = props.imageModal;
    const setImageModal = props.setImageModal;
    if (image) {
        return (
            <Modal
                show={imageModal}
                size="xl"
                style={{ zIndex: 10000 }}
                onHide={() => {
                    setImageModal(false);
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <Image src={image} width={'100%'} />
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    } else return <></>;
};
