import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
import React from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
const UserListModal = (props) => {
    const userListModal = props.userListModal;
    const users = props.users;
    console.log('🚀 ~ file: user-list-modal.js ~ line 7 ~ UserListModal ~ users', users);

    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={userListModal}
            onHide={() => {
                props.setUserListModal(false);
            }}
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {users &&
                    users.length > 0 &&
                    users.map((user_, i) => {
                        const user = user_.userId;
                        const basicInfo = user.basicInfo;
                        let name = '';
                        let profilePicture = '';
                        if (user.userType === 'individual') {
                            name = basicInfo.firstName + ' ' + basicInfo.lastName;
                            profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultIndividualProfilePicture;
                        } else if (user.userType === 'organization') {
                            name = basicInfo.name;
                            profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultOrganizationProfilePicture;
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
