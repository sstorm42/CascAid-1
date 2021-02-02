import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

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
                            <p>Step 5 of 7</p>
                            <ProgressBar now={70} />
                            <br />
                            <h4>Connect with other platform to show your impact</h4>
                        </div>
                        <Row>
                            <Col sm="12">
                                <Link to="www.facebook.com">
                                    <i className="fa fa-facebook-square " aria-hidden="true"></i>
                                    <label className="margin-on-left">Facebook</label>
                                </Link>
                            </Col>
                            <Col sm="12">
                                <Link to="www.twitter.com">
                                    <i className="fa fa-twitter-square " aria-hidden="true"></i>
                                    <label className="margin-on-left">Twitter</label>
                                </Link>
                            </Col>
                            <Col sm="12">
                                <Link to="www.linkedin.com">
                                    <i className="fa fa-linkedin-square " aria-hidden="true"></i>
                                    <label className="margin-on-left">Linked In</label>
                                </Link>
                            </Col>
                            <Col sm="12">
                                <Link to="www.instagram.com">
                                    <i className="fa fa-instagram " aria-hidden="true"></i>
                                    <label className="margin-on-left">Instagram</label>
                                </Link>
                            </Col>
                        </Row>
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
                                    Skip
                                </Button>
                                <Button className="btn signUpBtn margin-on-left" disabled={submitting} type="submit">
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
