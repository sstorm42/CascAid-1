import React, { useState, useEffect } from 'react';
import { Field } from 'redux-form';
import { SelectRender, InputRender, DatePickerRender, TextRender, MultiSelectRender } from '../form_template/input-render';
import ProfilePictureUploader from '../../components/user/profile-picture-changer';
import { Container, Row, Col, ProgressBar, Button, Image } from 'react-bootstrap';
import { countries, states } from '../../constants/country-and-state';
import { organizationHeaders, totalOrganizationStep } from '../../constants/step-headers';

const BasicInfoForm = (props) => {
    const submitting = props.submitting;
    const allOrganizationTypes = props.allOrganizationTypes;
    const editMode = props.editMode;
    console.log('PROPS', props);
    const [selectedCountry, setSelectedCountry] = useState(props.stateAndCountry.country ? props.stateAndCountry.country : 'US');
    const [selectedState, setSelectedState] = useState(props.stateAndCountry.state);
    useEffect(() => {
        setSelectedCountry(props.stateAndCountry.country);
    }, [props.stateAndCountry.country]);
    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="9" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        {editMode ? (
                            <h4>Basic Information</h4>
                        ) : (
                            <div>
                                <p>
                                    Step {organizationHeaders[2].stepNo} of {totalOrganizationStep}
                                </p>
                                <ProgressBar now={organizationHeaders[2].percent} />
                                <br />
                                <h4>{organizationHeaders[2].header}</h4>

                                <div style={{ height: 20 }} />
                            </div>
                        )}
                        <Row>
                            <Col>
                                <Field name="name" type="text" component={InputRender} label="Name" placeholder="Your organization name..." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="phone" type="text" component={InputRender} label="Phone" placeholder="000-0000-000" />
                            </Col>
                            <Col>
                                <Field name="ein" type="text" component={InputRender} label="EIN" placeholder="ABCD..." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="website" type="text" component={InputRender} label="Website URL" placeholder="www.abc.xyz" />
                            </Col>
                            <Col>
                                <Field name="contactEmail" type="text" component={InputRender} label="Contact Email" placeholder="help@abc.com" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field
                                    name="mission"
                                    type="text"
                                    component={TextRender}
                                    label="Mission"
                                    placeholder="Your organization mission..."
                                    col1={2}
                                    col2={10}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Field
                                    name="description"
                                    type="text"
                                    component={TextRender}
                                    label="Description"
                                    placeholder="Your organization mission..."
                                    col1={2}
                                    col2={10}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field
                                    name="organizationTypes"
                                    component={MultiSelectRender}
                                    label="Organization Type"
                                    col1={3}
                                    col2={9}
                                    options={allOrganizationTypes}
                                    zIndex={2000}
                                />
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col>
                                <Field name="address.street1" type="text" component={InputRender} label="Street 1" placeholder="" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="address.street2" type="text" component={InputRender} label="Street 2" placeholder="" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="address.city" type="text" component={InputRender} label="City" placeholder="" />
                            </Col>
                            <Col>
                                <Field name="address.code" type="text" component={InputRender} label="ZIP Code" placeholder="1234..." />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field
                                    name="address.country"
                                    type="text"
                                    component={SelectRender}
                                    label="Country"
                                    onChange={(e, value) => {
                                        setSelectedCountry(value);
                                    }}
                                    col1={4}
                                    col2={8}
                                >
                                    {countries.map((country, i) => {
                                        return (
                                            <option key={i} value={country.code}>
                                                {country.name}
                                            </option>
                                        );
                                    })}
                                </Field>
                            </Col>
                            <Col>
                                <Field name="address.state" type="text" component={SelectRender} label="State" col1={4} col2={8}>
                                    {selectedCountry &&
                                        states[selectedCountry] &&
                                        states[selectedCountry].map((state, i) => {
                                            return (
                                                <option key={i} value={state.code}>
                                                    {state.name}
                                                </option>
                                            );
                                        })}
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="right-align">
                                {props.profilePicture && <Image height="100" width="auto" src={props.profilePicture} rounded className="profile-picture" />}
                            </Col>
                            <Col>
                                <ProfilePictureUploader
                                    profilePicture={props.profilePicture}
                                    handlePictureUpload={props.handlePictureUpload}
                                    setProfilePicture={props.setProfilePicture}
                                />
                            </Col>
                        </Row>
                        {/* <Row>

                            <Col className="right-align">{props.profilePicture && <Image height="100" width="auto" src={props.profilePicture} rounded className="profile-picture" />}</Col>
                            <Col>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={props.handlePictureUpload} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                        Choose profile picture
                                    </label>
                                </div>
                            </Col>
                        </Row> */}
                        <br />
                        <Row>
                            <Col sm="6"></Col>
                            <Col sm="6" className="right-align">
                                <Button className="btn next-btn margin-on-left" size="sm" disabled={submitting} type="submit">
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

export default BasicInfoForm;
