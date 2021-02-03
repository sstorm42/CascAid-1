import React from 'react';
import { Field } from 'redux-form';
// import { Link } from 'react-router-dom';
import { InputRenderWithLargeLabel, SwitchRender, SelectRender } from '../form_template/input-render';
// import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allInvolvementTypes } from '../../constants/involvement-types';

const ProfileStep3 = (props) => {
    const submitting = props.submitting;
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
                            <h4>Give us a sense of your invlovement interest</h4>
                        </div>

                        <Field id="volunteerOpportunity" name="involvement.volunteerOpportunity" component={SwitchRender} label="I am looking for Volunteer Opportunities" defaultChecked="true" />
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
                        <Field id="project" name="involvement.project" component={SwitchRender} label="I am looking for Projects" />
                        <Field id="boardMembership" name="involvement.boardMembership" component={SwitchRender} label="I am looking for Board Membership" />
                        <Field id="committees" name="involvement.committees" component={SwitchRender} label="I am looking for Committees/Advisory Boards" />
                        <Field id="typeOfInvolvement" name="involvement.typeOfInvolvement" type="text" component={SelectRender} label="I want the following type of involvement">
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
                                <Button
                                    className="btn signUpBtn"
                                    onClick={() => {
                                        props.handleBackButton(3);
                                    }}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button className="btn signUpBtn" disabled={submitting} type="submit">
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
