import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, email, stringLengthRange, alphabetic } from '../../actions/validate';
import { InputRenderWithLargeLabel, HalfInputRender, InputRender, SwitchRender, SelectRender, CheckBoxRender } from '../form_template/input-render';
import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allInvolvementTypes } from '../../constants/involvement-types';

const stringRange2To200 = stringLengthRange(2, 200);
const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const ProfileStep4 = (props) => {
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleSignUpSubmit}>
                        <br />

                        <div>
                            <p>Step 3 of 7</p>
                            <ProgressBar now={42} />
                            <br />
                            <h4>Give us a sense of your invlovement interest</h4>
                        </div>

                        <Field id="volunteerOpportunity" name="lookingFor.volunteerOpportunity" component={SwitchRender} label="I am looking for Volunteer Opportunities" defaultChecked="true" />
                        <Field id="availabilityPerWeek" name="lookingFor.availabilityPerWeek" type="text" component={InputRenderWithLargeLabel} label="Average Weekly Hours Available" />
                        <Field id="project" name="lookingFor.project" component={SwitchRender} label="I am looking for Projects" defaultChecked="true" />
                        <Field id="boardMembership" name="lookingFor.boardMembership" component={SwitchRender} label="I am looking for Board Membership" defaultChecked="true" />
                        <Field id="committees" name="lookingFor.committees" component={SwitchRender} label="I am looking for Committees/Advisory Boards" defaultChecked="true" />
                        <Field id="typeOfInvolvement" name="lookingFor.typeOfInvolvement" type="text" component={SelectRender} label="I want the following type of involvement">
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
                                <Button className="btn signUpBtn" disabled={submitting} type="submit">
                                    Back
                                </Button>
                            </Col>
                            {/* <Col sm="6"></Col> */}
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

export default ProfileStep4;
