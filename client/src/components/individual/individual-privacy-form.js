import React from 'react';
import { Field } from 'redux-form';
import { CheckBoxRender, SelectRender } from '../form_template/input-render';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { allActivityTypes } from '../../constants/privacy-activity-types';
import { allSearchTypes } from '../../constants/privacy-search-types';
import { individualHeaders, totalIndividualStep } from '../../constants/step-headers';
const PrivacyForm = (props) => {
    const editMode = props.editMode;
    const submitting = props.submitting;
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        <br />
                        {editMode ? (
                            <h4>Privacy Information</h4>
                        ) : (
                            <div>
                                <p>
                                    Step {individualHeaders[4].stepNo} of {totalIndividualStep}
                                </p>
                                <ProgressBar now={individualHeaders[4].percent} />
                                <br />
                                <h4>{individualHeaders[4].header}</h4>
                            </div>
                        )}

                        <Field id="publicCalender" name="isCalenderPublic" component={CheckBoxRender} label="My calender is public" col1={6} col2={6} type="checkbox" />
                        <Field
                            id="isEmailSearchable"
                            name="isEmailSearchable"
                            component={CheckBoxRender}
                            label="Add me to an organization’s mailing list when I follow them"
                            col1={6}
                            col2={6}
                            type="checkbox"
                        />
                        <Field id="project" name="isUserSearchable" component={CheckBoxRender} label="Organization can find me in searches" col1={6} col2={6} type="checkbox" />
                        <Field id="showOnSearch" name="showOnSearch" type="text" component={SelectRender} label="I show up in individual searches done by:" col1={6} col2={6}>
                            {allActivityTypes.map((activity, i) => {
                                return (
                                    <option key={activity.value} value={activity.value}>
                                        {activity.label}
                                    </option>
                                );
                            })}
                        </Field>
                        <Field id="showActivity" name="showActivity" type="text" component={SelectRender} label="My activity shows up on the feeds of" col1={6} col2={6}>
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

export default PrivacyForm;
