import React, { useState, useEffect } from 'react';
import { Field } from 'redux-form';
import { SelectRender, InputRender, DatePickerRender, MultiSelectRender, CreatableMultiSelectRender } from '../form_template/input-render';
import { information_asking_reason } from '@Constants/misc';
import { Container, Row, Col, ProgressBar, Button, Modal, Image } from 'react-bootstrap';
import { countries, states } from '@Constants/country-and-state';
import { allGenders } from '@Constants/genders';
import { allRaces } from '@Constants/races';
import { individualHeaders, totalIndividualStep } from '@Constants/step-headers';
import ProfilePictureUploader from '@Components/user/profile-picture-changer';
import { date, required } from '@Actions/validate';
const BasicInfoForm = (props) => {
    const submitting = props.submitting;
    const editMode = props.editMode;
    const [infoModal, setInfoModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(props.stateAndCountry.country ? props.stateAndCountry.country : 'US');
    // const [selectedState, setSelectedState] = useState(props.stateAndCountry.state);
    useEffect(() => {
        setSelectedCountry(props.stateAndCountry.country);
    }, [props.stateAndCountry.country]);
    return (
        <Container className="saLoginForm">
            <Modal
                style={{ zIndex: 10000 }}
                show={infoModal}
                onHide={() => {
                    setInfoModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Why do we ask for this information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="justify-text">{information_asking_reason}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setInfoModal(false);
                        }}
                    >
                        I understand
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col></Col>
                <Col md="9" className="sign-ing-form">
                    <form onSubmit={props.handleOnSubmit}>
                        {editMode ? (
                            <h4>Basic Information</h4>
                        ) : (
                            <div>
                                <p>
                                    Step {individualHeaders[2].stepNo} of {totalIndividualStep}
                                </p>
                                <ProgressBar now={individualHeaders[2].percent} />
                                <br />
                                <h4>{individualHeaders[2].header}</h4>
                                <small
                                    className="small-simple-btn"
                                    onClick={() => {
                                        setInfoModal(true);
                                    }}
                                >
                                    Why do we ask for this information?
                                </small>
                                <div style={{ height: 20 }} />
                            </div>
                        )}
                        <Row>
                            <Col>
                                <Field name="firstName" type="text" component={InputRender} label="First Name" placeholder="John" validate={[required]} />
                            </Col>
                            <Col>
                                <Field name="lastName" type="text" component={InputRender} label="Last Name" placeholder="Doe" validate={[required]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <Field name="dateOfBirth" type="text" component={DatePickerRender} label="Date Of Birth" zIndex={4000} validate={[date]} />
                            </Col>
                            <Col sm="6">
                                <Field name="kids" type="text" component={SelectRender} label="Kids" col1={4} col2={8}>
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
                                <Field name="phone" type="text" component={InputRender} label="Phone" />
                            </Col>
                            <Col>
                                <Field name="gender" type="text" component={SelectRender} label="Gender" col1={4} col2={8}>
                                    {allGenders.map((gender, i) => {
                                        return (
                                            <option key={i} value={gender.value}>
                                                {gender.label}
                                            </option>
                                        );
                                    })}
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field name="races" component={MultiSelectRender} label="Race" col1={2} col2={10} options={allRaces} zIndex={3000} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field
                                    name="languages"
                                    component={CreatableMultiSelectRender}
                                    label="Language Fluency"
                                    col1={2}
                                    col2={10}
                                    options={props.allLanguages}
                                    zIndex={2000}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field
                                    name="skills"
                                    component={CreatableMultiSelectRender}
                                    label="Skills"
                                    col1={2}
                                    col2={10}
                                    options={props.allSkills}
                                    zIndex={1000}
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
                                <Field name="address.code" type="text" component={InputRender} label="ZIP Code" placeholder="1234..." validate={[required]} />
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
