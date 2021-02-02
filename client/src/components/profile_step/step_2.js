import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, email, stringLengthRange, alphabetic } from '../../actions/validate';
import { SaInputRender, HalfInputRender, InputRender } from '../form_template/input-render';
import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';

const stringRange2To200 = stringLengthRange(2, 200);
const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const ProfileStep2 = (props) => {
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleSignUpSubmit}>
                        <div>
                            <p>Step 2 of 7</p>
                            <ProgressBar now={28} />
                            <br />
                            <h4>Tell us about yourself</h4>
                        </div>

                        <Row className="form-group">
                            <Col sm="3">
                                <label>
                                    <b>Name</b>
                                </label>
                            </Col>
                            <Col sm="9">
                                <Row>
                                    <Col sm="6">
                                        <Field name="firstName" type="text" component={HalfInputRender} placeholder="First Name" validate={[required, stringRange6To256]} />
                                    </Col>
                                    <Col sm="6">
                                        <Field name="lastName" type="text" component={HalfInputRender} placeholder="Last Name" validate={[required, email, stringRange6To256]} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Field name="age" type="text" component={InputRender} placeholder="Age in years" label="Age" validate={[required, stringRange6To100]} />
                        <Field name="kids" type="text" component={InputRender} label="Kids" validate={[required, stringRange6To100]} />
                        <Field name="race" type="text" component={InputRender} label="Race" validate={[required, stringRange6To100]} />
                        <Field name="gender" type="text" component={InputRender} label="Gender" validate={[required, stringRange6To100]} />
                        <Field name="languagesFluency" type="text" component={InputRender} label="Languages" validate={[required, stringRange6To100]} />
                        <Field name="boardMemberships" type="text" component={InputRender} label="Board Memberships" validate={[required, stringRange6To100]} />
                        <Field name="areasOfInterest" type="text" component={InputRender} label="Areas of Interests" validate={[required, stringRange6To100]} />
                        <Field name="communityInvolvement" type="text" component={InputRender} label="Community Involvement" validate={[required, stringRange6To100]} />
                        <Field name="skills" type="text" component={InputRender} label="Skills" validate={[required, stringRange6To100]} />
                        <Field name="employer" type="text" component={InputRender} label="Employer" validate={[required, stringRange6To100]} />
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

export default ProfileStep2;
