import React from 'react';
import { Field } from 'redux-form';
import { SwitchRender, SelectRender, InputRender } from '../form_template/input-render';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { organizationHeaders, totalOrganizationStep } from '../../constants/step-headers';
const InternalLinkForm = (props) => {
    const submitting = props.submitting;

    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />

                        <div>
                            <p>
                                Step {organizationHeaders[4].stepNo} of {totalOrganizationStep}
                            </p>
                            <ProgressBar now={organizationHeaders[4].percent} />
                            <br />
                            <h4>{organizationHeaders[4].header}</h4>
                        </div>

                        <Field name="events" type="text" component={InputRender} label="Events link" />
                        <Field name="rss" type="text" component={InputRender} label="RSS link" />
                        <Field name="blog" type="text" component={InputRender} label="Blogs link" />
                        <br />
                        <Row>
                            <Col sm="6">
                                <Button
                                    className="btn signUpBtn"
                                    size="sm"
                                    onClick={() => {
                                        props.handleBackButton();
                                    }}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col sm="6" className="right-align">
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

export default InternalLinkForm;
