import React from 'react';
import { Field } from 'redux-form';
import { InputRender, CreatableMultiSelectRender, MultiSelectRender } from '../form_template/input-render';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allServiceAreaTypes } from '@Constants/service-area-types';
import { organizationHeaders, totalOrganizationStep } from '@Constants/step-headers';
const ServiceInfoForm = (props) => {
    const submitting = props.submitting;
    const editMode = props.editMode;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />
                        {editMode ? (
                            <h4>{organizationHeaders[3].header}</h4>
                        ) : (
                            <div>
                                <p>
                                    Step {organizationHeaders[3].stepNo} of {totalOrganizationStep}
                                </p>
                                <ProgressBar now={organizationHeaders[3].percent} />
                                <br />
                                <h4>{organizationHeaders[3].header}</h4>
                            </div>
                        )}

                        <Field
                            name="serviceAreaTypes"
                            component={MultiSelectRender}
                            label="Service area type"
                            col1={4}
                            col2={8}
                            options={allServiceAreaTypes}
                            zIndex={5000}
                        />
                        <Field
                            name="serviceAreas"
                            type="text"
                            component={CreatableMultiSelectRender}
                            label="Service Areas"
                            col1={4}
                            col2={8}
                            placeholder="Add new service area"
                            zIndex={4000}
                        />
                        <Field
                            name="impactAreas"
                            component={CreatableMultiSelectRender}
                            label="Impact area"
                            col1={4}
                            col2={8}
                            options={props.allImpactAreas}
                            zIndex={3000}
                        />
                        <Field name="donationLink" type="text" component={InputRender} label="Donation link" placeholder="" />
                        <Field name="newsLetterLink" type="text" component={InputRender} label="News letter link" placeholder="" />
                        <Field
                            name="keywords"
                            type="text"
                            component={CreatableMultiSelectRender}
                            label="Keywords"
                            col1={4}
                            col2={8}
                            placeholder="Add new keywords"
                            zIndex={2000}
                        />

                        <br />
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
                                <Button className="btn signUpBtn margin-on-left" size="sm" disabled={submitting} type="submit">
                                    {editMode ? 'Save' : 'Next'}
                                </Button>
                            </Col>
                        </Row>
                        <br />
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default ServiceInfoForm;
