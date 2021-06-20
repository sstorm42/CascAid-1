import React from 'react';
import { Field } from 'redux-form';
import { InputRenderWithLargeLabel, CheckBoxRender, SelectRender, TextRender, CreatableMultiSelectRender } from '../form_template/input-render';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allInvolvementTypes } from '../../constants/involvement-types';
import { individualHeaders, totalIndividualStep } from '../../constants/step-headers';

const ProfileStep3 = (props) => {
    const submitting = props.submitting;
    const editMode = props.editMode;
    const allImpactAreas = props.allImpactAreas;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col lg="10" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />
                        {editMode ? (
                            <h4>Involvement Information</h4>
                        ) : (
                            <div>
                                <p>
                                    Step {individualHeaders[3].stepNo} of {totalIndividualStep}
                                </p>
                                <ProgressBar now={individualHeaders[3].percent} />
                                <br />
                                <h4>{individualHeaders[3].header}</h4>
                            </div>
                        )}
                        <Field
                            name="impactAreas"
                            component={CreatableMultiSelectRender}
                            label="Impact area of interest"
                            col1={4}
                            col2={8}
                            options={allImpactAreas}
                            zIndex={2000}
                        />

                        <label>Community Involvement</label>
                        <Field
                            name="communityInvolvement"
                            type="text"
                            component={TextRender}
                            label="Tell us a bit about what you currently do!"
                            col1={12}
                            col2={12}
                        />
                        <Field
                            id="lookingForVolunteeringOpportunity"
                            name="lookingForVolunteeringOpportunity"
                            type="checkbox"
                            component={CheckBoxRender}
                            label="I am looking for Volunteer Opportunities"
                            col1={6}
                            col2={6}
                        />
                        <Field
                            id="lookingForProject"
                            name="lookingForProject"
                            component={CheckBoxRender}
                            type="checkbox"
                            label="I am looking for Projects"
                            col1={6}
                            col2={6}
                        />
                        <Field
                            id="lookingForMembership"
                            name="lookingForMembership"
                            component={CheckBoxRender}
                            type="checkbox"
                            label="I am looking for Board Membership"
                            col1={6}
                            col2={6}
                        />
                        <Field
                            id="lookingForCommittee"
                            name="lookingForCommittee"
                            component={CheckBoxRender}
                            type="checkbox"
                            label="I am looking for Committees/Advisory Boards"
                            col1={6}
                            col2={6}
                        />
                        <Field
                            id="availabilityPerWeek"
                            name="availabilityPerWeek"
                            type="number"
                            component={InputRenderWithLargeLabel}
                            min="0"
                            max="40"
                            step="1"
                            label="Average Weekly Hours Available"
                        />
                        <Field
                            id="typeOfInvolvement"
                            name="typeOfInvolvement"
                            type="text"
                            component={SelectRender}
                            label="I want the following type of involvement"
                            col1={6}
                            col2={6}
                        >
                            {allInvolvementTypes.map((involvementType, i) => {
                                return (
                                    <option key={involvementType.value} value={involvementType.value}>
                                        {involvementType.label}
                                    </option>
                                );
                            })}
                        </Field>

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

export default ProfileStep3;
