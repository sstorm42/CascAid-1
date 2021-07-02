import React, { useState } from 'react';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { individualHeaders, organizationHeaders, totalIndividualStep, totalOrganizationStep } from '@Constants/step-headers';
import MembershipModal from './membership-modal';
import MembershipList from './membership-list';
const MembershipForm = (props) => {
    const editMode = props.editMode;
    const [membershipModal, setMembershipModal] = useState(false);
    const [mode, setMode] = useState('create');
    const memberships = props.memberships;
    const userType = props.userType;
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
                <Col className="sign-ing-form">
                    <br />
                    {editMode ? (
                        <h4>Membership Information</h4>
                    ) : userType === 'individual' ? (
                        <div>
                            <p>
                                Step {individualHeaders[5].stepNo} of {totalIndividualStep}
                            </p>
                            <ProgressBar now={individualHeaders[5].percent} />
                            <br />
                            <h4>{individualHeaders[5].header}</h4>
                        </div>
                    ) : (
                        <div>
                            <p>
                                Step {organizationHeaders[4].stepNo} of {totalOrganizationStep}
                            </p>
                            <ProgressBar now={organizationHeaders[4].percent} />
                            <br />
                            <h4>{organizationHeaders[4].header}</h4>
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
                    <MembershipList
                        memberships={memberships}
                        userType={userType}
                        handleAcceptMembership={props.handleAcceptMembership}
                        handleRejectMembership={props.handleRejectMembership}
                        handleDeleteMembership={props.handleDeleteMembership}
                    />
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
                                    Continue
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <br />
                </Col>
            </Row>
        </Container>
    );
};
export default MembershipForm;
