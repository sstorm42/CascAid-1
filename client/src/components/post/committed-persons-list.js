import React, { useState } from 'react';
import { Container, Row, Col, Modal, Image } from 'react-bootstrap';
import LoadingAnim from '../form_template/loading-anim';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
const CommittedPersonsList = (props) => {
    const committedList = props.committedList;
    const committedLoading = props.committedLoading;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={props.committedModal}
            onHide={() => {
                props.setCommittedModal(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{committedList.length} Persons Liked this post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {committedLoading && <LoadingAnim />}
                {committedList &&
                    committedList.length > 0 &&
                    committedList.map((person, i) => {
                        let name = '';
                        let profilePicture = '';
                        if (person.userType === 'individual') {
                            name = person.userFirstName + ' ' + person.userLastName;
                            profilePicture = person.userProfilePicture ? person.userProfilePicture : defaultIndividualProfilePicture;
                        } else if (person.userType === 'organization') {
                            name = person.userName;
                            profilePicture = person.userProfilePicture ? person.userProfilePicture : defaultOrganizationProfilePicture;
                        }
                        return (
                            <Container className="ppl-liked-list" key={i}>
                                <Row>
                                    <Col sm={2}>
                                        <Image src={profilePicture} thumbnail style={{ width: '100%', height: '100%' }} />
                                    </Col>
                                    <Col sm={6} className="v-middle">
                                        {name}
                                    </Col>
                                </Row>
                            </Container>
                        );
                    })}
            </Modal.Body>
        </Modal>
    );
};
export default CommittedPersonsList;
