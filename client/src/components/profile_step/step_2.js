import React from 'react';
import { Field } from 'redux-form';
// import { Link } from 'react-router-dom';
import { required } from '../../actions/validate';
import { SelectRender, InputRender, DatePickerRender, TextRender } from '../form_template/input-render';
// import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
const ProfileStep2 = (props) => {
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="9" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <div>
                            <p>Step 2 of 7</p>
                            <ProgressBar now={28} />
                            <br />
                            <h4>Tell us about yourself</h4>
                        </div>
                        <Row>
                            <Col>
                                <Field name="basicInfo.firstName" type="text" component={InputRender} label="First Name" placeholder="John" validate={[required]} />
                            </Col>
                            <Col>
                                <Field name="basicInfo.lastName" type="text" component={InputRender} label="Last Name" placeholder="Doe" validate={[required]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <Field name="basicInfo.dateOfBirth" type="text" component={DatePickerRender} label="Date Of Birth" />
                            </Col>
                            <Col sm="6">
                                <Field name="basicInfo.kids" type="text" component={SelectRender} label="Kids">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="4+">4+</option>
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="basicInfo.phone" type="text" component={InputRender} label="Phone" />
                            </Col>
                            <Col>
                                <Field name="basicInfo.race" type="text" component={InputRender} label="Race" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="basicInfo.gender" type="text" component={SelectRender} label="Gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                            </Col>
                            <Col>
                                <Field name="basicInfo.languages" type="text" component={InputRender} label="Language" />
                            </Col>
                        </Row>
                        <Field name="basicInfo.communityInvolvement" type="text" component={TextRender} label="Community Involvement" />
                        <Field name="basicInfo.address" type="text" component={TextRender} label="Address" />

                        {/* <Field name="basicInfo.boardMemberships" type="text" component={InputRender} label="Board Memberships" validate={[required]} />
                        <Field name="areasOfInterest" type="text" component={InputRender} label="Areas of Interests" validate={[required]} />
                        <Field name="skills" type="text" component={InputRender} label="Skills" validate={[required]} /> */}

                        {/* <Field name="employer" type="text" component={InputRender} label="Employer" validate={[required]} /> */}
                        <br />
                        <Row>
                            <Col sm="6"></Col>
                            <Col sm="6" className="right-align">
                                <Button className="btn next-btn" size="sm" disabled={submitting} type="submit">
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
