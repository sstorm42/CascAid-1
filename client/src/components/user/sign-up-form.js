import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, email, stringLengthRange } from '@Actions/validate';
import { SaInputRender } from '../form_template/input-render';
import * as RoutePath from '@Constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';

const stringRange6To256 = stringLengthRange(6, 256);
const stringRange6To100 = stringLengthRange(6, 100);

const SignUpForm = (props) => {
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="6" className="sign-ing-form">
                    <form onSubmit={props.handleSignUpSubmit}>
                        <div className="center-text">
                            <h3>Sign Up On CascAid</h3>
                        </div>
                        <div>
                            <p>Step 1 of 7</p>
                            <ProgressBar now={14} />
                            <br />
                            <h4>Sign up as</h4>
                        </div>
                        <Row onChange={props.handleUserTypeChange}>
                            <Col className="sign-as-left">
                                <label className={`btn ${props.isIndividualChecked ? 'user-type-checked' : 'user-type-unchecked'}`}>
                                    <input className="sign-radio-btn" style={{ display: 'none' }} type="radio" value={1} name="regType" defaultChecked />{' '}
                                    Individual
                                </label>
                            </Col>
                            <Col className="sign-as-right">
                                <label className={`btn ${!props.isIndividualChecked ? 'user-type-checked' : 'user-type-unchecked'}`}>
                                    <input className="sign-radio-btn" style={{ display: 'none' }} type="radio" value={2} name="regType" />
                                    Organization
                                </label>
                            </Col>
                        </Row>

                        <br />
                        <div className="container">
                            <Field
                                name="email"
                                type="text"
                                component={SaInputRender}
                                placeholder="example@example.com"
                                label="Email"
                                validate={[required, email, stringRange6To256]}
                            />
                            <Field name="password" type="password" component={SaInputRender} label="Password" validate={[required, stringRange6To100]} />
                            <Field
                                name="confirmPassword"
                                type="password"
                                component={SaInputRender}
                                label="Confirm Password"
                                validate={[required, stringRange6To100]}
                            />
                            <br />
                            <Row>
                                <Col sm="6">
                                    <Button className="btn signUpBtn" disabled={submitting} type="submit" size="sm">
                                        SIGN UP
                                    </Button>
                                </Col>
                                {/* <Col sm="6"></Col> */}
                            </Row>
                            <br />
                            <p>
                                Already have an account? &nbsp;
                                <Link
                                    style={{
                                        fontSize: '14px',
                                    }}
                                    to={RoutePath.signInPage}
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
