import React from 'react';
import { Field } from 'redux-form';
// import { Link } from 'react-router-dom';
import { InputRenderWithLargeLabel, SwitchRender, SelectRender, InputRender, TextRender, CreatableMultiSelectRender, MultiSelectRender } from '../form_template/input-render';
// import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allInvolvementTypes } from '../../constants/involvement-types';
import { allServiceAreaTypes } from '../../constants/service-area-types';

const ProfileStep3 = (props) => {
    const submitting = props.submitting;
    const userType = props.userType;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />
                        <div>
                            <p>Step 3 of 7</p>
                            <ProgressBar now={42} />
                            <br />
                            <h4>Give us a sense of your involvement interest</h4>
                        </div>
                        {userType === 'client' && (
                            <>
                                <Field
                                    name="involvement.areaOfInterest"
                                    component={CreatableMultiSelectRender}
                                    label="Impact area of interest"
                                    col1={4}
                                    col2={8}
                                    options={props.areaOfInterests}
                                    zIndex={2000}
                                />
                                <Field name="involvement.communityInvolvement" type="text" component={TextRender} label="Community Involvement" />
                                <Field
                                    id="volunteerOpportunity"
                                    name="involvement.volunteerOpportunity"
                                    component={SwitchRender}
                                    label="I am looking for Volunteer Opportunities"
                                    defaultChecked="true"
                                />

                                <Field id="project" name="involvement.project" component={SwitchRender} label="I am looking for Projects" />
                                <Field id="boardMembership" name="involvement.boardMembership" component={SwitchRender} label="I am looking for Board Membership" />
                                <Field id="committees" name="involvement.committees" component={SwitchRender} label="I am looking for Committees/Advisory Boards" />
                                <Field
                                    id="availabilityPerWeek"
                                    name="involvement.availabilityPerWeek"
                                    type="number"
                                    component={InputRenderWithLargeLabel}
                                    min="0"
                                    max="40"
                                    unit="Hour"
                                    step="1"
                                    label="Average Weekly Hours Available"
                                />
                                <Field
                                    id="typeOfInvolvement"
                                    name="involvement.typeOfInvolvement"
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
                            </>
                        )}
                        {userType === 'organization' && (
                            <>
                                <Field name="serviceInfo.serviceAreaType" component={MultiSelectRender} label="Service area type" col1={4} col2={8} options={allServiceAreaTypes} zIndex={4000} />
                                <Field name="serviceInfo.impactArea" component={CreatableMultiSelectRender} label="Impact area" col1={4} col2={8} options={props.areaOfInterests} zIndex={3000} />
                                <Field name="serviceInfo.donationLink" type="text" component={InputRender} label="Donation link" placeholder="" />
                                <Field name="serviceInfo.newsLetter" type="text" component={InputRender} label="News letter link" placeholder="" />
                                <Field name="serviceInfo.keywords" type="text" component={CreatableMultiSelectRender} label="Keywords" col1={4} col2={8} placeholder="add new keywords" zIndex={2000} />
                            </>
                        )}
                        <br />
                        <Row>
                            <Col sm="6">
                                <Button
                                    className="btn signUpBtn"
                                    size="sm"
                                    onClick={() => {
                                        props.handleBackButton(3);
                                    }}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button className="btn signUpBtn" size="sm" type="submit">
                                    Skip
                                </Button>
                                <Button className="btn signUpBtn margin-on-left" size="sm" disabled={submitting} type="submit">
                                    Next
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
