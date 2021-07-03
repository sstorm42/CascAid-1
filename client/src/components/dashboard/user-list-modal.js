import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
import React from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
const UserListModal = (props) => {
    const userListModal = props.userListModal;
    const users = props.users;
    const modalType = props.modalType;
    const setUserListModal = props.setUserListModal;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={userListModal}
            onHide={() => {
                setUserListModal(false);
            }}
        >
            <Modal.Header closeButton>
                {users.length} {modalType}
                {users.length > 1 ? 's' : ''} found
            </Modal.Header>
            <Modal.Body>
                {users &&
                    users.length > 0 &&
                    users.map((user, i) => {
                        let name = '';
                        let profilePicture = '';
                        if (user.userType === 'individual') {
                            name = user.firstName + ' ' + user.lastName;
                            profilePicture = user.profilePicture ? user.profilePicture : defaultIndividualProfilePicture;
                        } else if (user.userType === 'organization') {
                            name = user.name;
                            profilePicture = user.profilePicture ? user.profilePicture : defaultOrganizationProfilePicture;
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

export default UserListModal;
