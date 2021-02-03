import React from 'react';
import { Field } from 'redux-form';
// import { Link } from 'react-router-dom';
import { SwitchRender, SelectRender } from '../form_template/input-render';
// import * as RoutePath from '../../constants/route-paths';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allActivityTypes } from '../../constants/privacy-activity-types';
import { allSearchTypes } from '../../constants/privacy-search-types';

const ProfileStep4 = (props) => {
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />

                        <div>
                            <p>Step 4 of 7</p>
                            <ProgressBar now={56} />
                            <br />
                            <h4>Adjust any privacy settings if needed</h4>
                        </div>

                        <Field id="publicCalender" name="privacy.isCalenderPublic" component={SwitchRender} label="My calender is public" />
                        <Field id="isEmailSearchable" name="privacy.isEmailSearchable" component={SwitchRender} label="Organizations may access my email" />
                        <Field id="project" name="privacy.isUserSearchable" component={SwitchRender} label="Organization can find me in searches" />
                        <Field id="showOnSearch" name="privacy.showOnSearch" type="text" component={SelectRender} label="I show up in individual search">
                            {allActivityTypes.map((activity, i) => {
                                return (
                                    <option key={activity.value} value={activity.value}>
                                        {activity.label}
                                    </option>
                                );
                            })}
                        </Field>
                        <Field id="showActivity" name="privacy.showActivity" type="text" component={SelectRender} label="My activity shows up on the feeds of">
                            {allSearchTypes.map((search, i) => {
                                return (
                                    <option key={search.value} value={search.value}>
                                        {search.label}
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
                                        props.handleBackButton(4);
                                    }}
                                >
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
