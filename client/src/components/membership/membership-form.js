import React, { useState } from 'react';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { individualHeaders } from '../../constants/step-headers';
import MembershipModal from './membership-modal';
import MembershipList from './membership-list';
const MembershipForm = (props) => {
    const editMode = props.editMode;
    const [membershipModal, setMembershipModal] = useState(false);
    const [mode, setMode] = useState('create');
    const memberships = props.memberships;
    return (
        <Container className="saLoginForm">
            <MembershipModal
                membershipModal={membershipModal}
                setMembershipModal={setMembershipModal}
                mode={mode}
                membership={props.membership}
                handleMembershipInfoChange={props.handleMembershipInfoChange}
                userSearchText={props.userSearchText}
                handleChangeSearchText={props.handleChangeSearchText}
                users={props.users}
                promiseOptions={props.promiseOptions}
                submitMembership={props.submitMembership}
            />
            <Row>
                <Col></Col>
                <Col md="10" className="sign-ing-form">
                    <br />
                    {editMode ? (
                        <h4>Privacy Information</h4>
                    ) : (
                        <div>
                            <p>Step {individualHeaders[5].stepNo} of 6</p>
                            <ProgressBar now={individualHeaders[5].percent} />
                            <br />
                            <h4>{individualHeaders[5].header}</h4>
                        </div>
                    )}
                    <br />
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                            setMode('create');
                            setMembershipModal(true);
                        }}
                    >
                        Add New Membership
                    </Button>
                    <br />
                    <MembershipList memberships={memberships} />
                    <div style={{ height: 100 }} />
                    <Row>
                        <Col sm="6">
                            {!editMode && (
                                <Button
                                    className="btn signUpBtn"
                                    size="sm"
                                    onClick={() => {
                                        props.handleBackButton();
                                    }}
                                >
                                    Back
                                </Button>
                            )}
                        </Col>
                        <Col sm="6" className="right-align">
                            {!editMode && (
                                <Button
                                    className="btn signUpBtn"
                                    size="sm"
                                    onClick={() => {
                                        props.handleSkipButton();
                                    }}
                                >
                                    Skip
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <br />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};
export default MembershipForm;
